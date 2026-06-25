---
name: environment-bootstrap
description: 产品同事无法运行项目、缺少 Node.js/npm、遇到依赖错误、询问如何启动，或需要 AI 先准备本地开发环境时使用。
---

# 环境启动

帮助产品同事把脚手架跑起来，不让他们自己排查工具链。

## 顺序

1. 先检查 Node.js 和 npm。
2. 如果缺少 Node.js，不要静默修改系统。
3. Windows 下可以提示用户运行：`powershell -ExecutionPolicy Bypass -File scripts/setup.ps1 -InstallNode`。
4. 如果已有 Node.js，运行 `npm run setup` 或 `npm install`。
5. 使用 `npm run doctor` 验证环境。
6. 使用 `npm run dev` 启动项目。

## 规则

- 不要先让产品经理检查 PATH 或包版本。
- 不要静默安装系统级软件。
- 缺少 Node.js/npm 时，不要继续实现原型。
- 缺少项目依赖时，可以自动安装项目依赖。
- 如果 `npm run dev` 失败，先读取终端输出并定位根因。

## 常用命令

- 检查环境：`npm run doctor`
- 安装项目依赖：`npm run setup`
- Windows 无 Node.js 时：`powershell -ExecutionPolicy Bypass -File scripts/setup.ps1 -InstallNode`
- 启动原型：`npm run dev`
