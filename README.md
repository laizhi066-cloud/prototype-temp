# 产品团队 AI 原型脚手架

这是一个给产品团队使用的 AI 原型项目。目标不是做正式生产系统，而是让产品经理用自然语言快速生成规范、可运行、可验收的 Vue 原型。

## 技术栈

- Vue 3
- Vite
- Element Plus
- Vue Router
- Pinia
- mockApi + localStorage

## 语言与编码

- 项目自有文档、注释、AI 回答、提示词和评审反馈统一使用 UTF-8 中文。
- 中文与英文、数字之间保留空格，例如：`Vue 3`、`Node.js 20`。
- 命令、路径、代码标识使用反引号，例如：`npm run dev`、`src/config/appConfig.js`。
- 第三方 vendored skills 保留原始语言，不做强制翻译。

## 启动

产品同事优先使用一键脚本：

- 检查环境：双击 `scripts/check-for-pm.bat`
- 安装依赖：双击 `scripts/setup-for-pm.bat`
- 启动项目：双击 `scripts/start-for-pm.bat`

如果你熟悉命令行，也可以使用下面的命令。

```bash
npm install
npm run dev
```

如果产品同事不确定环境是否装好，先运行：

```bash
npm run doctor
```

如果已经有 Node.js，但还没装项目依赖：

```bash
npm run setup
```

如果只需要补 Playwright 测试浏览器：

```bash
npm run setup:browsers
```

如果 Windows 电脑还没有 Node.js，可以运行：

```powershell
powershell -ExecutionPolicy Bypass -File scripts/setup.ps1 -InstallNode
```

这个命令会尝试通过 winget 安装 Node.js LTS。安装后关闭并重新打开终端，再运行 `npm run setup`。

默认登录信息：

- 账号：`ops.admin`
- 密码：`demo123`

PRD 文档可直接访问，不需要登录：

```text
http://127.0.0.1:5173/prd
```

登录后台后，右上角 `PRD` 按钮会新窗口打开文档。

## AI 使用方式

让 AI 先读 `AGENTS.md`，再使用项目内 skills。

产品同事第一次使用先看：

- `docs/pm-start-here.md`
- `docs/ai/prompt-library.md`
- `docs/ai/clarifying-question-prompts.md`
- `docs/ai/product-request-template.md`
- `docs/ai/prototype-acceptance-checklist.md`
- `docs/ai/pm-workflow.md`
- `docs/ai/commit-workflow.md`
- `docs/ai/development-handoff-workflow.md`

常用提示词：

```text
使用 product-prototype-orchestrator。
我想做一个订单管理系统，请先判断项目类型，然后按默认骨架规划页面和交互。
如果信息不够，只问我一个最关键的问题。
```

```text
使用 product-prototype-orchestrator。
我想做一个手机端活动报名页，请按 H5 原型处理，给出页面流程并实现可点击 Demo。
```

## 默认规则

- 后台管理、SaaS、CRM、运营系统默认有登录页、固定头部、侧边栏和内容区。
- C 端 Web 默认没有后台侧边栏。
- H5 默认用移动端宽度、单列内容、底部 Tab 或顶部返回栏。
- AI 不应该反复问产品“是否需要登录、头部、侧边栏”。
- AI 应该先根据产品行业、用户和使用场景推荐主题、配色、布局密度和登录页方向。
- AI 回答产品同事时默认使用中文。
- AI 每轮完成有效修改后必须创建中文 Git commit，方便回溯。
- 原型确认后，AI 必须生成 PRD 和开发交付包，不能只停留在可点击页面。
- 运行界面必须展示具体业务产品；“脚手架”相关说明只放在文档里。
- 页面不能直接读写 localStorage，必须通过 `src/mock/mockApi.js`。
- 产品名、品牌缩写、登录页文案、树状侧边栏导航和首页指标统一从 `src/config/productProfile.js` 修改。
- 默认登录账号、密码、演示用户角色和主题色从 `src/config/appConfig.js` 修改。
- 每个原型必须考虑加载、空状态、错误状态、表单校验和操作反馈。

## 验收测试

```bash
npm run test:smoke
```

这条测试会自动启动本地服务，验证登录、进入后台、打开订单管理、新增订单等核心流程。

不需要每次修改都运行 smoke。文档、规则、prompt 或 PRD 修改只需要轻量检查；只有改到登录、路由、导航或核心业务流程时再运行。

## 回溯提交

每轮 AI 修改完成后都应该创建中文 commit：

```bash
npm run commit:ai -- "完善订单管理原型"
```

commit 信息必须使用中文。产品同事后续可以根据 commit 记录回退或比较每轮原型变化。

## 开发交付

当原型确认可以进入开发时，让 AI 生成交付包：

```text
请使用 prd-development 和 development-handoff。
基于当前原型生成 PRD、用户故事、字段 / 状态说明、接口 / mock 数据说明、验收用例和开发任务拆分。
文档使用 UTF-8 中文，放到 docs/product/ 对应目录。
完成后创建中文 commit。
```

## Skills 目录

- `.agents/skills`：Codex / OpenAI agent 入口
- `.claude/skills`：Claude / Cursor 兼容入口
- `.opencode/skills`：OpenCode 兼容入口
- `vendor/skills`：第三方 skills 快照与来源记录

第三方来源和许可证见 `vendor/skills/SOURCES.md`。
