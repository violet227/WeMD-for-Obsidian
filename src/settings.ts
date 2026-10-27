import { App, Modal, Notice, PluginSettingTab, Setting, TFile } from "obsidian";
import type WemdPlugin from "./main";
import { CODE_THEMES, type CodeThemeId } from "./themes";

export interface WemdSettings {
  themeId: string;
  themeFolder: string;
  /** 自定义主题前是否拼接 WeMD basic 基础样式 */
  customPrependBasic: boolean;
  /** 自定义主题使用的代码高亮 */
  customCodeTheme: CodeThemeId;
  showMacBar: boolean;
  linkToFootnote: boolean;
  tableWrap: boolean;
  syncScroll: boolean;
}

export const DEFAULT_SETTINGS: WemdSettings = {
  themeId: "default",
  themeFolder: "wemd-themes",
  customPrependBasic: true,
  customCodeTheme: "github",
  showMacBar: false,
  linkToFootnote: false,
  tableWrap: false,
  syncScroll: true,
};

class NameModal extends Modal {
  constructor(
    app: App,
    private readonly onSubmit: (name: string) => void,
  ) {
    super(app);
  }

  onOpen() {
    this.titleEl.setText("新建自定义主题");
    let value = "";
    new Setting(this.contentEl).setName("主题名称").addText((text) => {
      text.setPlaceholder("我的主题").onChange((v) => (value = v));
      text.inputEl.addEventListener("keydown", (e) => {
        if (e.key === "Enter") this.submit(value);
      });
      window.setTimeout(() => text.inputEl.focus(), 0);
    });
    new Setting(this.contentEl).addButton((btn) =>
      btn
        .setButtonText("创建")
        .setCta()
        .onClick(() => this.submit(value)),
    );
  }

  private submit(value: string) {
    const name = value.trim();
    if (!name) {
      new Notice("请输入主题名称");
      return;
    }
    this.close();
    this.onSubmit(name);
  }

  onClose() {
    this.contentEl.empty();
  }
}

export class WemdSettingTab extends PluginSettingTab {
  constructor(
    app: App,
    private readonly plugin: WemdPlugin,
  ) {
    super(app, plugin);
  }

  display(): void {
    const { containerEl } = this;
    const { settings, themes } = this.plugin;
    containerEl.empty();

    new Setting(containerEl)
      .setName("默认主题")
      .setDesc("笔记 frontmatter 中的 wemd-theme 字段可覆盖此设置。")
      .addDropdown((dd) => {
        themes.list().forEach((t) => dd.addOption(t.id, t.name));
        dd.setValue(settings.themeId).onChange(async (v) => {
          await this.plugin.updateSettings({ themeId: v });
        });
      });

    new Setting(containerEl)
      .setName("代码块 Mac 风格标题栏")
      .addToggle((t) =>
        t.setValue(settings.showMacBar).onChange(async (v) => {
          await this.plugin.updateSettings({ showMacBar: v });
        }),
      );

    new Setting(containerEl)
      .setName("链接转脚注")
      .setDesc("公众号正文不支持外链，开启后将链接转为文末引用。")
      .addToggle((t) =>
        t.setValue(settings.linkToFootnote).onChange(async (v) => {
          await this.plugin.updateSettings({ linkToFootnote: v });
        }),
      );

    new Setting(containerEl)
      .setName("表格单元格换行")
      .setDesc("关闭时宽表格横向滚动。")
      .addToggle((t) =>
        t.setValue(settings.tableWrap).onChange(async (v) => {
          await this.plugin.updateSettings({ tableWrap: v });
        }),
      );

    new Setting(containerEl)
      .setName("滚动同步")
      .setDesc("预览随编辑器按比例滚动。")
      .addToggle((t) =>
        t.setValue(settings.syncScroll).onChange(async (v) => {
          await this.plugin.updateSettings({ syncScroll: v });
        }),
      );

    containerEl.createEl("h3", { text: "自定义主题" });

    new Setting(containerEl)
      .setName("主题文件夹")
      .setDesc(
        "该文件夹下的每个 .css 文件即一个主题。选择器请以 #wemd 开头；首行可写 /* name: 主题名 */。",
      )
      .addText((t) =>
        t.setValue(settings.themeFolder).onChange(async (v) => {
          await this.plugin.updateSettings({
            themeFolder: v.trim().replace(/^\/+|\/+$/g, "") || "wemd-themes",
          });
        }),
      );

    new Setting(containerEl)
      .setName("拼接 WeMD 基础样式")
      .setDesc("开启后自定义 CSS 叠加在 basic 基础样式之上，只需写差异部分。")
      .addToggle((t) =>
        t.setValue(settings.customPrependBasic).onChange(async (v) => {
          await this.plugin.updateSettings({ customPrependBasic: v });
        }),
      );

    new Setting(containerEl)
      .setName("自定义主题代码高亮")
      .addDropdown((dd) => {
        (Object.keys(CODE_THEMES) as CodeThemeId[]).forEach((id) =>
          dd.addOption(id, CODE_THEMES[id].name),
        );
        dd.setValue(settings.customCodeTheme).onChange(async (v) => {
          await this.plugin.updateSettings({
            customCodeTheme: v as CodeThemeId,
          });
        });
      });

    let baseId = settings.themeId;
    new Setting(containerEl)
      .setName("新建自定义主题")
      .setDesc("复制一个内置主题的 CSS 到主题文件夹，作为起点修改。")
      .addDropdown((dd) => {
        themes.builtIns().forEach((t) => dd.addOption(t.id, t.name));
        if (!themes.builtIns().some((t) => t.id === baseId)) baseId = "default";
        dd.setValue(baseId).onChange((v) => (baseId = v));
      })
      .addButton((btn) =>
        btn
          .setButtonText("新建")
          .setCta()
          .onClick(() => {
            new NameModal(this.app, async (name) => {
              try {
                const file = await themes.createFromBuiltIn(baseId, name);
                await this.plugin.updateSettings({
                  themeId: themes.idForFile(file),
                });
                await this.app.workspace.getLeaf("tab").openFile(file);
                this.display();
              } catch (e) {
                new Notice(`创建失败: ${e instanceof Error ? e.message : e}`);
              }
            }).open();
          }),
      );

    const customs = themes.customs();
    if (customs.length === 0) {
      containerEl.createEl("p", {
        text: `尚无自定义主题。在 ${settings.themeFolder}/ 下放入 .css 文件即可。`,
        cls: "setting-item-description",
      });
    }
    customs.forEach((t) => {
      new Setting(containerEl)
        .setName(t.name)
        .setDesc(t.path ?? "")
        .addButton((btn) =>
          btn.setButtonText("编辑").onClick(async () => {
            const file = this.app.vault.getAbstractFileByPath(t.path ?? "");
            if (file instanceof TFile) {
              await this.app.workspace.getLeaf("tab").openFile(file);
            }
          }),
        )
        .addButton((btn) =>
          btn
            .setButtonText("删除")
            .setWarning()
            .onClick(async () => {
              const file = this.app.vault.getAbstractFileByPath(t.path ?? "");
              if (file instanceof TFile) {
                await this.app.fileManager.trashFile(file);
              }
              if (settings.themeId === t.id) {
                await this.plugin.updateSettings({ themeId: "default" });
              }
              this.display();
            }),
        );
    });
  }
}
