# 产品原型项目 AI 协作规则

本项目是面向产品团队的 AI 原型脚手架。AI 的职责是帮助产品经理把产品想法转成可运行、可验收的原型，而不是反复追问基础布局问题，或直接输出大量不可维护代码。

## 语言与编码

- 所有新增和修改的文档、注释、提示词、说明、评审反馈和回答，默认使用 **UTF-8 编码的中文**。
- 中文文档遵循中英文混排规范：中文和英文、数字之间保留空格；中文语境使用全角标点；命令、路径、代码标识使用半角字符和反引号。
- 代码中的变量名、文件名、API 名称可以保留英文；面向产品同事的说明必须用中文。
- 第三方 vendored skills 的原始内容可以保留原文，不要为了翻译而破坏来源快照。

## 必走流程

1. 读取产品需求后，先判断项目类型，再提出问题。
2. 使用 `.agents/skills/project-intake-classifier/SKILL.md` 选择默认原型骨架。
3. 提问前使用 `.agents/skills/product-question-gate/SKILL.md`，避免连续追问产品经理。
4. 使用 `.agents/skills/product-theme-advisor/SKILL.md` 根据产品推荐主题、配色、布局密度和登录页方向。
5. 接到真实产品需求时，先使用 `.agents/skills/product-context/SKILL.md` 更新 `src/config/productProfile.js`。
6. 构建界面时使用 Vue 3、Vite、Element Plus、Vue Router、Pinia 和现有 mock API 模式。
7. 如果项目跑不起来，先使用 `.agents/skills/environment-bootstrap/SKILL.md`，不要直接改业务代码。
8. 如果新增业务模块，使用 `.agents/skills/feature-module-template/SKILL.md`。
9. 如果修改品牌样式、默认登录信息或主题，使用 `.agents/skills/brand-config/SKILL.md`。
10. 写代码前先用中文输出简短实现说明：项目类型、主题推荐、页面、路由、组件、mock API、验收标准。
11. 每轮真实产品需求、页面变更、模块新增或流程调整后，默认同步更新 `/prd` 对应 PRD；只有纯样式微调或规则文档修改可以跳过，并在最终回复说明。
12. 原型进入评审或交付开发前，必须使用 `.agents/skills/prd-development/SKILL.md` 和 `.agents/skills/development-handoff/SKILL.md` 补齐开发交付包。
13. 每次完成有效修改并通过必要验证后，必须创建一个中文 Git commit，方便产品团队回溯。

## 默认产品决策

- 后台管理、SaaS、CRM、运营系统和数据看板默认包含登录页、固定头部、侧边栏、内容区、用户菜单、退出登录、Element Plus 表格/表单/弹窗、筛选、分页、加载态、空状态、错误态和表单校验。
- C 端 Web 默认使用顶部导航、首页、列表页、详情页、个人中心，不使用后台侧边栏。
- H5 移动端默认使用移动端宽度、单列内容、触控友好控件、底部 Tab 或顶部返回栏，复杂表格改成卡片或分组列表。
- 数据看板默认包含顶部筛选区、指标卡、图表区和明细表格。
- 无法判断项目类型时，只问一个问题：「这是后台管理、C 端 Web，还是 H5？」

## 硬性规则

- 验证以产品验收为主，不以代码质量展示为主；不要把大量测试日志抛给产品同事。
- 按改动类型分级验证：文档 / 规则 / prompt 只做轻量检查；页面样式改动需要截图；路由、登录、核心流程改动才运行 smoke 测试。
- 项目无法运行时，先检查 Node.js 和 npm，再判断是否是代码问题。
- 不要静默安装系统级软件。只有用户明确运行 `scripts/setup.ps1 -InstallNode` 时，才尝试安装 Node.js。
- 不要问产品经理后台类产品是否需要登录页、头部或侧边栏，这些都是默认配置。
- 不要连续抛出一串初始化问题；每轮最多问 1 个高影响问题。
- 不要生成巨型单文件原型。
- 不要默认套蓝白大卡片、抽象背景图或“AI 味”登录页；先按产品行业和用户场景推荐设计方向。
- 运行界面必须展示具体业务产品，不要展示脚手架身份；脚手架说明只放在文档中。
- 不要绕过共享布局、路由、状态管理或 mock API。
- 页面不能直接读写 `localStorage`，必须通过 `src/mock/mockApi.js`。
- 产品名、登录页文案、侧边栏品牌、树状导航和首页指标必须来自 `src/config/productProfile.js`。
- PRD 文档必须从 `docs/product/prds/index.json` 和 `docs/product/prds/*.md` 读取；不要把完整 PRD 写回 `productProfile.js`。
- `/prd` 是公开文档入口，不需要鉴权；左侧必须是 PRD 目录树，右侧必须支持预览、在线新增、编辑和保存。
- PRD 在线保存依赖本地 Vite `dev` / `preview` 服务提供的 `/api/prds`；如果只部署纯静态 `dist`，PRD 页面只能作为只读预览。
- PM 不需要确认“是否写入 PRD”；AI 默认把本轮产品结论写入对应 PRD，PM 只负责在线微调。
- 默认账号、默认密码、演示用户角色和主题色来自 `src/config/appConfig.js`。
- 每个原型流程都要在相关位置包含加载、空状态、错误、校验、成功反馈和危险操作确认。
- 原型完成不等于交付完成；交付给开发前必须产出 PRD、用户故事、接口 / 数据说明、验收用例和开发任务拆分。
- 开发交付文档默认放在 `docs/product/prds/`、`docs/product/user-stories/`、`docs/product/development-handoffs/` 和 `docs/product/acceptance-cases/`。
- 如果本轮对文件做了有效修改，完成前必须执行 Git 提交；commit 信息必须使用中文，不能使用纯英文提交信息。
- 提交前必须查看工作区变更，避免把与本轮无关的文件混入 commit。
- 如果当前目录还不是 Git 仓库，先初始化 Git，再提交；如果无法提交，必须在最终回复中说明失败原因和当前未提交文件。
- AI 最终回复必须包含本轮 commit 信息；没有 commit 时不能说已经完成回溯提交。

## 分级验证规则

- 文档、规则、prompt、skills 修改：检查文件存在、链接路径和关键规则即可，不需要运行构建或 smoke。
- 产品文案、配置、主题 token 修改：运行构建；涉及视觉时补截图。
- 页面 UI、布局、路由、登录、导航、核心业务流程修改：运行构建和 smoke。
- PRD、交付包、验收清单修改：检查文档结构完整即可；除非同时改了运行页面，否则不跑 smoke。
- 最终回复面向 PM，只说明“已验证什么”和“是否通过”，不要贴长日志。

## 多 AI 工具技能目录

- Codex / OpenAI agents：`.agents/skills`
- Claude / Cursor 兼容目录：`.claude/skills`
- OpenCode 兼容目录：`.opencode/skills`
- 第三方来源快照：`vendor/skills`

如果某个 AI 工具不能自动发现项目技能，先读取本文件，再手动打开对应的 `SKILL.md`。
