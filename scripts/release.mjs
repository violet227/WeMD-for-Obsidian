#!/usr/bin/env node
/**
 * 发布 / 更新 GitHub Release（含 Obsidian 插件三件套资产）。幂等：
 *   - 若 tag 对应的 Release 已存在，则更新其正文（PATCH）并补传资产；
 *   - 若同名资产已存在，先删除再上传，保证可重复执行。
 *
 * 凭证获取顺序：
 *   1. 环境变量 GITHUB_TOKEN
 *   2. Git Credential Manager 中已登录的 github.com 凭证
 *
 * 用法：
 *   node scripts/release.mjs
 *   GITHUB_TOKEN=xxx node scripts/release.mjs
 */
import { execSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');

const REPO = 'violet227/Wetype-for-Obsidian';
const API = 'https://api.github.com';
const UPLOAD = 'https://uploads.github.com';
const ASSETS = ['manifest.json', 'main.js', 'styles.css'];

function getToken() {
  if (process.env.GITHUB_TOKEN && process.env.GITHUB_TOKEN.trim()) {
    return process.env.GITHUB_TOKEN.trim();
  }
  try {
    const out = execSync(
      'printf "protocol=https\\nhost=github.com\\n" | git credential fill',
      { cwd: root, encoding: 'utf8' }
    );
    const m = out.match(/^password=(.*)$/m);
    if (m && m[1].trim()) return m[1].trim();
  } catch {
    /* ignore */
  }
  throw new Error(
    '未找到 GitHub 凭证：请设置 GITHUB_TOKEN 环境变量，或确保 Git Credential Manager 已登录 github.com。'
  );
}

function api(method, base, pathname, { json, file } = {}) {
  const url = base + pathname;
  const args = [
    'curl', '-sS', '-L', '--retry', '5', '--retry-delay', '2', '--retry-all-errors',
    '--connect-timeout', '15', '--max-time', '60',
    '-X', method, url,
    '-H', 'Accept: application/vnd.github+json',
    '-H', `Authorization: Bearer ${TOKEN}`,
    '-H', 'X-GitHub-Api-Version: 2022-11-28',
  ];
  if (json !== undefined) {
    args.push('-H', 'Content-Type: application/json', '-d', json);
  }
  if (file) {
    args.push('-H', 'Content-Type: application/octet-stream', '-T', file);
  }
  const out = execSync(args.join(' '), {
    encoding: 'utf8',
    maxBuffer: 64 * 1024 * 1024,
  });
  return out;
}

const TOKEN = getToken();

const manifest = JSON.parse(fs.readFileSync(path.join(root, 'manifest.json'), 'utf8'));
const version = manifest.version;
const tag = `v${version}`;

let notes = '';
const notesPath = path.join(root, 'release-notes.md');
if (fs.existsSync(notesPath)) notes = fs.readFileSync(notesPath, 'utf8').trim();
if (!notes) notes = `公众号排版 ${tag}\n\n详见 README。`;

// 1) 是否已存在该 tag 的 Release
console.log(`→ 检查是否已存在 Release ${tag}`);
let releaseId = null;
let htmlUrl = null;
try {
  const existing = JSON.parse(
    api('GET', API, `/repos/${REPO}/releases/tags/${tag}`)
  );
  if (existing && existing.id) {
    releaseId = existing.id;
    htmlUrl = existing.html_url;
    console.log(`  · 已存在，id=${releaseId}，更新正文`);
    const patched = JSON.parse(
      api('PATCH', API, `/repos/${REPO}/releases/${releaseId}`, {
        json: JSON.stringify({ body: notes, name: tag }),
      })
    );
    htmlUrl = patched.html_url || htmlUrl;
  }
} catch {
  /* 404 → 不存在，下面创建 */
}

// 2) 不存在则创建
if (!releaseId) {
  console.log(`→ 创建 Release ${tag}`);
  const created = JSON.parse(
    api('POST', API, `/repos/${REPO}/releases`, {
      json: JSON.stringify({
        tag_name: tag,
        name: tag,
        body: notes,
        target_commitish: 'main',
        draft: false,
        prerelease: false,
        make_latest: 'true',
      }),
    })
  );
  if (!created.id) {
    console.error('创建 Release 失败：\n' + JSON.stringify(created).slice(0, 800));
    process.exit(1);
  }
  releaseId = created.id;
  htmlUrl = created.html_url;
  console.log(`  ✓ 已创建：${htmlUrl}`);
}

// 3) 上传资产（同名先删后传）
for (const asset of ASSETS) {
  const filePath = path.join(root, asset);
  if (!fs.existsSync(filePath)) {
    console.warn(`! 跳过缺失资产：${asset}`);
    continue;
  }
  // 列出已有资产
  let existingAssets = [];
  try {
    existingAssets = JSON.parse(
      api('GET', API, `/repos/${REPO}/releases/${releaseId}/assets`)
    );
  } catch {
    existingAssets = [];
  }
  for (const a of existingAssets) {
    if (a.name === asset) {
      console.log(`  · 删除旧资产 ${asset} (id=${a.id})`);
      try {
        api('DELETE', API, `/repos/${REPO}/releases/assets/${a.id}`);
      } catch {
        /* ignore */
      }
    }
  }
  console.log(`→ 上传资产 ${asset} (${(fs.statSync(filePath).size / 1024).toFixed(0)} KB)`);
  const resp = api(
    'POST',
    UPLOAD,
    `/repos/${REPO}/releases/${releaseId}/assets?name=${encodeURIComponent(asset)}`,
    { file: filePath }
  );
  try {
    const parsed = JSON.parse(resp);
    if (parsed && parsed.state === 'uploaded') {
      console.log(`  ✓ ${asset} 上传成功`);
    } else {
      console.warn(`  ! ${asset} 上传返回异常：${resp.slice(0, 200)}`);
    }
  } catch {
    console.warn(`  ! ${asset} 上传返回非 JSON：${resp.slice(0, 200)}`);
  }
}

console.log(`\n完成。Release 地址：${htmlUrl}`);
