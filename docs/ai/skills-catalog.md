# 产品团队 AI Skills 目录（技能库校准版）

本项目把 AI 协作规则放在项目内，产品同事推到远程后，Codex、OpenCode、Claude、Cursor 等工具都能通过 `AGENTS.md` 和 skills 目录读取同一套规则。

> **本项目技术栈：Vue 3 + Vite + Element Plus + Pinia + mock（localStorage）。**
> 铁律：**禁止加依赖、禁止破坏「双击 HTML 打开」、一次只做一个功能。**
> 因此凡是假设 **Tailwind / shadcn / 通用设计令牌（design token）** 的通用技能，本项目**只取设计理念，不引入对应技术栈**，UI 一律走 Element Plus。详见下方「⚠️ 通用样式技能（仅作设计理念参考）」。

技能存放在 `.agents/skills/`（共 **23 个**），并镜像到 `.claude/skills`、`.opencode/skills`（三处内容一致）。

---

## ⭐ 本项目最常用技能（按工作流顺序）

| 顺序 | 技能 | 什么时候用 |
| --- | --- | --- |
| 1 | `product-question-gate` | 接到需求先用它控制追问：先推断默认值，每轮最多问 1 个高影响问题 |
| 2 | `prd-development` | 澄清后先写 `prd/<功能名>.md` 给 PM 确认，再写代码 |
| 3 | `feature-module-template` | 新增/扩展业务模块（页面+路由+mockApi+localStorage+UI+验收） |
| 4 | `mock-api-localstorage` | 模拟前后端交互、本地持久化、各种加载/成功/失败/空状态 |
| 5 | `element-plus-prototype` / `ui-ux-pro-max` | 搭建或修改 UI（**本项目 UI 首选这两个**） |
| 6 | `prototype-review` | 声明原型完成前做产品视角自检 |
| 7 | `development-handoff` | 原型定稿后输出 PRD / 用户故事 / 验收用例 / 接口说明给开发 |
| 8 | `environment-bootstrap` | 项目跑不起来、缺 Node/npm、依赖报错时 |

---

## 一、本项目自定义技能（中文，强匹配本项目规则）

| 技能 | 一句话作用 | 触发场景 / PM 触发语 | 本项目适用 |
| --- | --- | --- | --- |
| `product-question-gate` | 限制 AI 连续追问：先推断默认值，每轮最多问 1 个高影响问题，禁止问已定义的脚手架问题 | 任何探索/规划/设计/实现前；「别一直问我，先按默认值做」 | ✅ 核心，每次需求开场都该用 |
| `project-intake-classifier` | 把需求识别为后台/SaaS/CRM/C 端 Web/H5/活动页/数据看板/工具页，定默认布局与交互假设 | 「先判断这是什么类型的项目」 | ✅ 适用 |
| `product-theme-advisor` | 按行业/用户/设备/严肃度/数据密度推荐主题、配色、布局密度、登录页方向，避免泛化 AI 味界面 | 「帮我推荐主题和配色」 | ✅ 适用（建议落到 Element Plus 主题变量，不引入 Tailwind） |
| `product-context` | 切换产品上下文（产品名/目标用户/类型/登录文案/侧边栏/首页指标），让界面展示真实业务而非脚手架说明 | 「把示例切换成『会员运营后台』」 | ✅ 适用 |
| `product-prototype-orchestrator` | 总编排：把原始想法串成「类型识别→页面计划→UI 骨架→mockApi 计划→实现→评审」 | 「我想做一个 XX 系统，请规划页面和交互」 | ✅ 适用（大需求统筹入口） |
| `element-plus-prototype` | 用 Vue 3 + Element Plus 构建/修改后台、SaaS、CRM、看板、表单、表格、弹窗、流程页 | 「做一个后台原型/加一个表格页」 | ✅ **UI 首选**，与本技术栈完全对齐 |
| `feature-module-template` | 新增/扩展业务模块，强制包含页面+路由+mockApi+localStorage+Element Plus UI+交互状态+评审产物 | 「给后台加一个客户管理模块」 | ✅ 核心，新增模块走它 |
| `mock-api-localstorage` | 模拟前后端交互与本地持久化（登录、CRUD、筛选、加载/成功/失败/空状态、演示数据） | 「让数据能保存、刷新不丢」 | ✅ 核心，与本项目 mock 方案对齐 |
| `brand-config` | 统一改产品名、品牌文案、默认登录账号、演示角色、主题色、应用标签 | 「把原型改成『星河 CRM』，默认账号 pm.demo」 | ✅ 适用（所有产品身份从统一配置改） |
| `prototype-review` | 原型完成前的产品视角自检：产品表达、UI 一致性、交互完整性、Element Plus 使用、状态覆盖、脚手架规则 | 「请评审当前原型」 | ✅ 核心，完工前必做 |
| `environment-bootstrap` | 准备/排查本地环境（Node/npm/依赖），帮忙启动本地服务 | 「这个项目跑不起来，帮我启动」 | ✅ 适用 |
| `development-handoff` | 原型确认后输出 PRD、用户故事、验收用例、接口数据说明、研发任务拆分等交付物 | 「把原型交给开发，出一套交付材料」 | ✅ 适用 |

## 二、PM 方法论 / 工作坊技能（通用，英文，按需取方法）

| 技能 | 一句话作用 | 触发场景 / PM 触发语 | 本项目适用 |
| --- | --- | --- | --- |
| `prd-development` | 把发现期笔记整理成结构化 PRD（问题—用户—方案—成功标准），可交付给工程 | 「帮我写一份完整 PRD」 | ✅ 适用（产出落到本项目 `prd/` 目录，遵守 `prd/_模板.md`） |
| `user-story` | 按 Mike Cohn 格式 + Gherkin 验收标准写用户故事 | 「把这条需求写成用户故事」 | ✅ 适用（方法论，与栈无关） |
| `user-story-mapping` | 用户故事地图：活动→步骤→任务→发布切片，规划 MVP/backlog | 「帮我做用户故事地图，排 MVP」 | ✅ 适用 |
| `customer-journey-map` | 客户旅程地图：阶段、触点、行为、情绪、指标 | 「梳理一下用户从注册到首次价值的旅程」 | ✅ 适用 |
| `lean-ux-canvas` | Lean UX Canvas v2：从业务问题出发，暴露假设、定学习目标 | 「跑一个 Lean UX Canvas 工作坊」 | ✅ 适用 |

## 三、⚠️ 通用样式 / 设计技能（仅作设计理念参考，**勿引入 Tailwind/shadcn**）

> **本项目 UI 一律用 Element Plus。** 下面这几个技能默认假设 Tailwind / shadcn / 通用设计令牌（design token），**与本项目技术栈不符**。
> 用法：**只借鉴它们的设计理念**（配色系统、排版层级、间距、状态设计、无障碍、风格方向），
> **不要在本项目里安装或生成 Tailwind / shadcn / Radix / CSS 变量令牌体系**（会触犯「禁止加依赖」铁律）。
> 本项目要做 UI，请优先 `element-plus-prototype` 和 `ui-ux-pro-max`。

| 技能 | 它原本假设什么 | 在本项目怎么用 |
| --- | --- | --- |
| `ui-styling`（ckm-ui-styling） | shadcn/ui + Radix UI + **Tailwind CSS** + canvas 视觉 | ⚠️ 仅参考其布局/无障碍/暗色模式**理念**；**不引入 Tailwind/shadcn**，组件改用 Element Plus |
| `design-system`（ckm-design-system） | 三层 **design token**（primitive→semantic→component）+ CSS 变量 | ⚠️ 仅参考其令牌分层**思路**；本项目用 Element Plus 主题变量，不另建 token 体系/不加依赖 |
| `design`（ckm-design） | 品牌识别、logo、CIP、HTML 演示（Chart.js）、banner、icon、社媒图（含 Gemini AI） | ⚠️ 仅在做**品牌/视觉素材**时按需参考；不要把它的 HTML/Chart.js 产物塞进 Vue 原型，UI 仍走 Element Plus |
| `ui-ux-pro-max` | 多栈 UI/UX 智库（50+ 风格、161 配色、字体配对、99 条 UX 准则、图表）含 **Vue** 与 shadcn/ui MCP | ✅ **可用**（已覆盖 Vue 栈）：取其风格/配色/UX 准则即可；**忽略其中 shadcn/Tailwind 相关分支** |

## 四、自动化 / 工具类技能（环境相关，多为可选）

| 技能 | 一句话作用 | 触发场景 | 本项目适用 |
| --- | --- | --- | --- |
| `playwright` | 用 `playwright-cli` 从终端驱动真实浏览器（导航、填表、截图、抓数据、调 UI 流程） | 需要自动化浏览器验证流程时 | 🔸 可选：需额外环境，非「双击 HTML」场景；按需用，别因它加项目依赖 |
| `screenshot` | OS 级桌面/窗口/区域截图（其它截图能力不可用时兜底） | 「帮我截个屏」 | 🔸 可选工具，与产品逻辑无关 |

---

## 给产品同事的常用提示词

完整提示词库见：

- `docs/ai/prompt-library.md`
- `docs/ai/clarifying-question-prompts.md`
- `docs/ai/product-request-template.md`
- `docs/ai/pm-workflow.md`
- `docs/ai/commit-workflow.md`

```text
使用 product-prototype-orchestrator。
我想做一个订单管理系统，请先判断项目类型，然后按默认骨架规划页面和交互。
如果信息不够，只问我一个最关键的问题。
```

```text
使用 product-theme-advisor。
我想做一个会员运营后台，请先根据目标用户和业务场景推荐主题、配色、布局密度和登录页方向。
（提醒：落到 Element Plus 主题，不要引入 Tailwind/shadcn。）
```

```text
使用 feature-module-template。
给后台原型增加一个客户管理模块。请先列出页面、路由、字段、mockApi 和验收标准，再实现。
```

```text
使用 brand-config。
把这个原型改成"星河 CRM"，默认登录账号改成 pm.demo，密码改成 demo123。
```

```text
使用 prototype-review。
请从产品目标、交互完整性、视觉一致性、状态覆盖和 mock 数据合理性检查当前原型。
```

```text
使用 environment-bootstrap。
我这个项目跑不起来，请先检查 Node.js、npm 和项目依赖，再帮我启动本地服务。
```

---

## 镜像与第三方说明

- 技能源在 `.agents/skills/`，镜像到 `.claude/skills`、`.opencode/skills`，三处各 **23 个、内容一致**。
- 第三方 skills 源码快照见 `vendor/skills`，来源与许可证见 `vendor/skills/SOURCES.md`。
- **核心项目规则以 `.agents/skills` 中的自定义中文 skills（第一节）为准；** 第二/三/四节的通用 skills 作为方法库和设计辅助，**遇到技术栈冲突一律以 Element Plus + 不加依赖为准**。
