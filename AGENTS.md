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
11. 每次完成有效修改并通过必要验证后，必须创建一个中文 Git commit，方便产品团队回溯。

## 默认产品决策

- 后台管理、SaaS、CRM、运营系统和数据看板默认包含登录页、固定头部、侧边栏、内容区、用户菜单、退出登录、Element Plus 表格/表单/弹窗、筛选、分页、加载态、空状态、错误态和表单校验。
- C 端 Web 默认使用顶部导航、首页、列表页、详情页、个人中心，不使用后台侧边栏。
- H5 移动端默认使用移动端宽度、单列内容、触控友好控件、底部 Tab 或顶部返回栏，复杂表格改成卡片或分组列表。
- 数据看板默认包含顶部筛选区、指标卡、图表区和明细表格。
- 无法判断项目类型时，只问一个问题：「这是后台管理、C 端 Web，还是 H5？」

## 硬性规则

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
- 默认账号、默认密码、演示用户角色和主题色来自 `src/config/appConfig.js`。
- 每个原型流程都要在相关位置包含加载、空状态、错误、校验、成功反馈和危险操作确认。
- 如果本轮对文件做了有效修改，完成前必须执行 Git 提交；commit 信息必须使用中文，不能使用纯英文提交信息。
- 如果当前目录还不是 Git 仓库，先初始化 Git，再提交；如果无法提交，必须在最终回复中说明失败原因和当前未提交文件。
- AI 最终回复必须包含本轮 commit 信息；没有 commit 时不能说已经完成回溯提交。

## 多 AI 工具技能目录

- Codex / OpenAI agents：`.agents/skills`
- Claude / Cursor 兼容目录：`.claude/skills`
- OpenCode 兼容目录：`.opencode/skills`
- 第三方来源快照：`vendor/skills`

如果某个 AI 工具不能自动发现项目技能，先读取本文件，再手动打开对应的 `SKILL.md`。
