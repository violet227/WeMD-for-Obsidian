#!/usr/bin/env node
/**
 * 发布 GitHub Release（含 Obsidian 插件三件套资产）。
 *
 * 凭证获取顺序：
 *   1. 环境变量 GITHUB_TOKEN
 *   2. Git Credential Manager 中已登录的 github.com 凭证
 *
 * 用法：
 *   node scripts/release.mjs            # 用 manifest.json 的 version 打标签并发布
 *   GITHUB_TOKEN=xxx node scripts/release.mjs
 *
 * 说明：
 *   - 标签取 manifest.json 的 version，形如 v0.1.0
 *   - 若标签已存在则复用，不会重复创建
 *   - 上传 manifest.json / main.js / styles.css 三个资产
 */
import { execSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');

const REPO = 'violet227/Wetype-for-Obsidian';
const API = 'https://api.github.com';
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

function api(method, url, { json, file } = {}) {
  const args = [
    'curl', '-sS', '-X', method, url,
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

console.log(`→ 发布 Release ${tag} (${REPO})`);
const createResp = JSON.parse(
  api('POST', `${API}/repos/${REPO}/releases`, {
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

const releaseId = createResp.id;
if (!releaseId) {
  console.error('创建 Release 失败：\n' + JSON.stringify(createResp).slice(0, 800));
  process.exit(1);
}
console.log(`✓ Release 已创建：${createResp.html_url}`);

for (const asset of ASSETS) {
  const filePath = path.join(root, asset);
  if (!fs.existsSync(filePath)) {
    console.warn(`! 跳过缺失资产：${asset}`);
    continue;
  }
  console.log(`→ 上传资产 ${asset} (${(fs.statSync(filePath).size / 1024).toFixed(0)} KB)`);
  const resp = api(
    'POST',
    `${API}/repos/${REPO}/releases/${releaseId}/assets?name=${encodeURIComponent(asset)}`,
    { file: filePath }
  );
  const parsed = JSON.parse(resp);
  if (parsed && parsed.state === 'uploaded') {
    console.log(`  ✓ ${asset} 上传成功`);
  } else {
    console.warn(`  ! ${asset} 上传返回异常：${resp.slice(0, 200)}`);
  }
}

console.log('\n完成。可在仓库右侧 Releases 区看到该版本。');
