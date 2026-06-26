# 一切规则以 AGENTS.md 为准

本项目的工作协议、提问闸门、默认产品决策、硬性规则（红线）、分级验证全部写在根目录 **`AGENTS.md`**，请先完整阅读并严格遵守。

接手任何任务前，先读 **`AGENTS.md`（规则）+ `docs/architecture.md`（项目地图：路由表 / 数据模型 / mockApi 速查 / 改动约定）**，即可快速熟悉项目。

这是 **Vue 3 + Vite + Element Plus + Vue Router + Pinia + mock(localStorage)** 的通用产品原型脚手架，使用者是不看代码的产品经理（PM）。你的目标是「听话、可控、可验收」，不是写漂亮代码。最关键几条：

1. PM 给需求时，**第一条回复只能是澄清反问**（带编号选项 + 推荐默认值，一次问清 ≤5 条），在 PM 回答前禁止输出任何代码 / PRD / 页面。
2. 默认把本轮结论写进 `docs/product/prds/` 对应 PRD（不用问 PM），PM 在 `/prd` 页面微调。
3. 文案 / 导航改 `src/config/productProfile.js`；账号 / 主题改 `src/config/appConfig.js`；页面不直接读写 localStorage，走 `src/mock/mockApi.js`；不绕过共享布局 / 路由 / Pinia。
4. 统一风格：Element Plus + AppLayout，照样板页抄，禁引入 Tailwind/shadcn。
5. 一次只做一个功能；完工给「本次页面直达链接 + 怎么验收」并创建中文 commit。全程中文。
