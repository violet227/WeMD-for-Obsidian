#!/usr/bin/env node
/**
 * 版本号自增后同步更新 manifest.json / package.json / versions.json。
 * 配合 `npm version patch|minor|major` 使用（该命令会先改 package.json 版本号，
 * 再运行本脚本把版本号与 minAppVersion 同步进另外两个文件）。
 */
import { readFileSync, writeFileSync } from 'node:fs';

const targetVersion = process.env.npm_package_version;
if (!targetVersion) {
  console.error('请在 `npm version` 流程中运行此脚本（需要 npm_package_version 环境变量）。');
  process.exit(1);
}

const manifest = JSON.parse(readFileSync('manifest.json', 'utf8'));
const { minAppVersion } = manifest;
manifest.version = targetVersion;
writeFileSync('manifest.json', JSON.stringify(manifest, null, '\t') + '\n');

const packageJson = JSON.parse(readFileSync('package.json', 'utf8'));
packageJson.version = targetVersion;
writeFileSync('package.json', JSON.stringify(packageJson, null, '\t') + '\n');

const versionsPath = 'versions.json';
const versions = fsExists(versionsPath)
  ? JSON.parse(readFileSync(versionsPath, 'utf8'))
  : {};
versions[targetVersion] = minAppVersion;
writeFileSync(versionsPath, JSON.stringify(versions, null, '\t') + '\n');

console.log(`版本已同步为 ${targetVersion}（minAppVersion ${minAppVersion}）`);

function fsExists(p) {
  try {
    readFileSync(p);
    return true;
  } catch {
    return false;
  }
}
