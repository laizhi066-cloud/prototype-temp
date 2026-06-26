# Copilot 指令：一切以 AGENTS.md 为准

本项目工作协议全部写在根目录 `AGENTS.md`，请先阅读并严格遵守。接手前先读 `AGENTS.md` + `docs/architecture.md`（项目地图）。

这是 Vue 3 + Vite + Element Plus + Vue Router + Pinia + mock(localStorage) 的通用产品原型脚手架，使用者是不看代码的 PM。关键铁律：

1. 收到需求，**第一条回复只能是澄清反问**（编号选项 + 默认值，一次问清 ≤5 条），在 PM 回答前禁止输出任何代码 / PRD / 页面；只问业务不问技术。
2. 默认把结论写进 `docs/product/prds/` 对应 PRD（不问 PM），PM 在 `/prd` 微调。
3. 文案 / 导航改 `src/config/productProfile.js`；账号 / 主题改 `src/config/appConfig.js`；页面走 `src/mock/mockApi.js`，不直接读 localStorage。
4. 统一风格：Element Plus + AppLayout，照样板页抄，禁 Tailwind/shadcn。
5. 一次只做一个功能；完工给「本次页面直达链接 + 怎么验收」并创建中文 commit。全程中文。
