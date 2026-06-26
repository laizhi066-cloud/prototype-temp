# 项目速读地图（架构 + 数据 + 改动约定）

> **AI 接手本项目：先读 `AGENTS.md`（规则）+ 本文件（地图），再动手。**

## 1. 一句话定位

这是一个**通用产品原型脚手架**（不是任何具体业务系统）。默认演示是「订单管理系统」，**真实使用时 PM 不是从零写代码，而是改 `src/config/productProfile.js`**（品牌、导航树、指标、看板文案）把它换成自己的产品。**单门户后台**：只有一套登录 + 一套后台布局 + 一棵导航树，不存在多端 / 多角色门户。

新增业务功能 = 在脚手架已有的「布局 + Element Plus + mockApi + localStorage」骨架上加页面，而不是另起一套。

## 2. 技术栈与启动

- **Vue 3**（全部 `<script setup>`）+ **Vite 7** + **Element Plus 2**（全局注册）+ **Vue Router 4**（history 模式）+ **Pinia 3**。
- 数据层：**mockApi + localStorage**，无后端、无数据库。**零运行时依赖之外不要随便加依赖**（见 AGENTS.md 红线）。
- 启动命令：
  - `npm install` → `npm run dev`（默认 Vite，端口 5173）。
  - PM 一键脚本（Windows 双击）：`scripts/check-for-pm.bat`（查环境）、`scripts/setup-for-pm.bat`（装依赖）、`scripts/start-for-pm.bat`（启动，绑定 `127.0.0.1:5173`）。
  - `npm run doctor` 体检环境；`npm run build` / `npm run preview` 构建预览；`npm run test:smoke` 冒烟测试（Playwright）。

## 3. 目录结构速览

```
index.html                  入口 HTML（挂载 #app）
vite.config.js              Vite 配置 + 关键：/api/prds 中间件（PRD 读写文件）
src/
  main.js                   创建 app，注册 Pinia / Router / ElementPlus（全局）
  App.vue                   只渲染 <router-view>
  config/
    productProfile.js       ★ 产品品牌 + 导航树 + 看板文案/指标（PM 主要改这里）
    appConfig.js            ★ 默认账号/密码、角色、主色（primaryColor）
  router/index.js           路由表 + 登录守卫（beforeEach）
  layouts/AppLayout.vue     后台外壳：左侧栏(读 navTree) + 顶栏 + <slot/> 内容区 + 移动端抽屉
  stores/auth.js            Pinia 鉴权 store（user / isAuthenticated / login / logout）
  mock/
    storage.js              localStorage 读写封装（统一前缀 order_admin_）
    mockApi.js              authApi + orderApi（演示数据 + 异步 delay 模拟）
    prdApi.js               prdApi：走 fetch('/api/prds') 调 dev 中间件（非 localStorage）
  pages/                    各路由对应的页面组件（见第 5 节）
docs/
  product/prds/            ★ PRD 文档（*.md + index.json），被 /prd 页在线读写
  ai/                       AI/PM 协作文档（提问协议、提示词、交付/验收流程等）
  pm-start-here.md         PM 上手指引
.claude/skills/            内置技能库（产品/UX/原型相关 skill）
scripts/                   PM 一键脚本（check/setup/start，bat + mjs）
```

## 4. 路由表

守卫逻辑（`router/index.js` `beforeEach`）：非 `meta.public` 路由未登录 → 跳 `/login?redirect=`；已登录访问 `/login` → 跳 `/`（dashboard）。

| 路由 path | 页面组件 | 主要数据来源 | 说明 |
| --- | --- | --- | --- |
| `/login` | `LoginPage` | `authApi.login`（经 auth store） | `meta.public`；账号密码默认填 appConfig 的值 |
| `/` | `DashboardPage` | `productProfile`（静态文案/指标） | 工作台：指标卡 + 处理链路 steps + 队列/风险/动态 |
| `/orders` | `OrdersPage` | `orderApi`（增删改查） | 订单列表：筛选 + 表格 + 新增/编辑弹窗 + 重置数据 |
| `/orders/exceptions` | `OrdersPage` | `orderApi` | 同 OrdersPage，`meta.status='pending'` 默认筛待处理；标题来自 meta |
| `/customers` | `PlaceholderPage` | `route.meta`（静态指标） | 占位页，标题/副标题/指标全读 `meta` |
| `/touch-records` | `PlaceholderPage` | `route.meta` | 占位页 |
| `/analytics` | `PlaceholderPage` | `route.meta` | 占位页 |
| `/prd/:docId?` | `ProductPrdPage` | `prdApi`（fetch /api/prds） | `meta.public`；PRD 文档站，可在线编辑；缺 docId 自动跳首篇 |
| `/prd-preview` | （redirect → `/prd`） | — | `meta.public`；旧链接兼容 |

> 注意：`OrdersPage` 复用于两条路由，`PlaceholderPage` 复用于三条路由——它们靠 `route.meta` 区分标题/筛选，**不是各自独立的文件**。

## 5. 样板页一览

- **LoginPage**：登录卡片，文案读 `productProfile`，账号默认值读 `appConfig`，调 `auth.login`。
- **DashboardPage**：工作台，全部内容来自 `productProfile`（dashboardMetrics / workspaceQueues / riskAlerts / recentActivities）+ 页内静态 `processSteps`。**纯展示，不调 api**。
- **OrdersPage**：最完整的「列表 + 筛选 + CRUD 弹窗」样板，走 `orderApi`。仿照它做新业务列表页。
- **PlaceholderPage**：空状态占位页，标题/指标全读 `route.meta`，适合「先占位、后填充」的导航项。
- **ProductPrdPage**：PRD 文档站（左树 + 右正文/编辑器），自带极简 Markdown 渲染，走 `prdApi`。**不包 AppLayout**（它是独立全屏页）。

## 6. 数据模型 + mockApi 速查

**localStorage 统一前缀：`order_admin_`**（`storage.js`，实际 key 如 `order_admin_session`、`order_admin_orders`）。读写一律走 `readStorage/writeStorage/removeStorage`，业务代码**禁止直接碰 `window.localStorage`**。

### authApi（`src/mock/mockApi.js`）

| 方法 | 签名 | 行为 |
| --- | --- | --- |
| `getSession()` | `() => session \| null` | 读 `order_admin_session` |
| `login()` | `async ({ account, password }) => session` | 校验非空 → 写 session（约 450ms delay）；session = `{ id, name=account, role }`（role 取 `appConfig.demoUserRole`） |
| `logout()` | `() => void` | 删 session |

**session 实体**：`{ id, name, role }`。auth store（`stores/auth.js`）在此之上暴露 `user / loading / isAuthenticated / login / logout`。

### orderApi（`src/mock/mockApi.js`）

**order 实体**：`{ id, customer, amount, status, channel, createdAt }`。`status ∈ {pending|paid|shipped}`，`channel ∈ {线上转化|企业客户|销售录入}`。存储 key `order_admin_orders`，默认有 3 条演示数据。

| 方法 | 签名 | 行为 |
| --- | --- | --- |
| `list()` | `async ({ keyword, status }) => { rows, total }` | 按订单号/客户名关键字 + 状态过滤（delay） |
| `create()` | `async (payload) => order` | 自动生成 `id=ORD-后6位时间戳`、`createdAt=今天`，插到队首 |
| `update()` | `async (id, payload) => order` | 按 id 合并更新 |
| `remove()` | `async (id) => { success:true }` | 按 id 删除 |
| `reset()` | `() => void` | 恢复 3 条默认演示数据（同步，无 delay） |

### prdApi（`src/mock/prdApi.js`）—— 走 HTTP 中间件，不是 localStorage

| 方法 | 签名 | 后端 |
| --- | --- | --- |
| `list()` | `async () => index` | `GET /api/prds` → 返回 `index.json`（groups + documents） |
| `get()` | `async (id) => { ...doc, content }` | `GET /api/prds/:id` → 读对应 `.md` 内容 |
| `create()` | `async ({ title, category, content }) => doc` | `POST /api/prds` → 新建 .md + 更新 index |
| `update()` | `async (id, payload) => doc` | `PUT /api/prds/:id` → 改 .md + 更新 index |

> `/api/prds` 由 `vite.config.js` 的 `prdMiddleware()` 实现（dev 与 preview 均注册），直接读写 `docs/product/prds/`（可用 `PRD_ROOT` 环境变量覆盖根目录）。**生产 build 后没有这个中间件，PRD 编辑只在 dev/preview 下可用。**

## 7. 改动约定（动手前必读）

铁律（详见 AGENTS.md）：**禁止加依赖、禁止破坏运行、一次只做一个功能、改动前先按提问协议反问 + 写 PRD 给 PM 确认。**

页面统一约定：
- 一律 `<script setup>`。业务页（非登录/非 PRD）**外层包 `AppLayout`**（`<AppLayout> ...内容... </AppLayout>`），自动获得侧栏 + 顶栏。
- UI 一律用 **Element Plus** 组件（已全局注册，无需 import 组件本身；图标从 `@element-plus/icons-vue` 按需 import）。
- 数据一律走 **mockApi**（`src/mock/*`），**禁止页面里直接读写 localStorage**。
- 改文案 / 品牌 / 导航 → 改 `src/config/productProfile.js`；改默认账号 / 主色 → 改 `src/config/appConfig.js`。**别把文案硬编码进页面。**

**加一个新页面的标准步骤：**
1. `src/config/productProfile.js` 的 `navTree` 加一项（`{ label, path, icon }`，或挂到某个带 `children` 的分组下）。`icon` 名需在 `AppLayout.vue` 的 `iconMap` 里存在，否则回退为 Document 图标——用新图标要在 `iconMap` 补登记。
2. `src/router/index.js` 加一条路由（`path` 与 navTree 对应；纯占位可复用 `PlaceholderPage` 并用 `meta` 传标题/指标）。
3. `src/pages/` 新建 `XxxPage.vue`（`<script setup>` + 包 `AppLayout`，仿 `OrdersPage`/`PlaceholderPage`）。
4. 如需数据：在 `src/mock/` 加/改实体与方法（仿 `orderApi`，经 `storage.js` 存取），并在 `mockApi.js` 里导出汇总，页面从 `../mock/mockApi` import。

## 8. PRD 体系

- 文档存放：`docs/product/prds/*.md`，目录与分组由同目录 `index.json` 维护（`groups`[分类] + `documents`[文档元数据：id/title/categoryId/order/file/updatedAt]）。
- 在线浏览/编辑：`/prd` 页（`ProductPrdPage`，`meta.public` 公开免登录），左侧分组树、右侧正文，支持「新增文档 / 编辑文档」并即时写回磁盘。
- 依赖：编辑能力依赖 `vite.config.js` 注册的 **`/api/prds` 中间件**，仅在 `npm run dev` / `npm run preview` 下可用（纯静态 build 后只能看不能改）。
- 模板：`docs/product/prds/template.md`（单功能 PRD 模板，PM 澄清完需求后据此先写 PRD 给确认，再写代码）。

## 三种产品形态（后台 / C 端 / H5）

脚手架内置三套外壳，新项目按需求选一种、删其余。形态画廊：`/demo`（公开）。

| 形态 | Layout | 样板页 | 路由 | 特征 |
|---|---|---|---|---|
| 后台管理 | `src/layouts/AppLayout.vue` | DashboardPage / OrdersPage | `/`、`/orders` | 侧边栏 + 顶栏 + 表格/表单/弹窗 |
| C 端 Web | `src/layouts/ConsumerLayout.vue` | ConsumerHomePage / ConsumerDetailPage | `/demo/consumer`、`/demo/consumer/detail` | 顶部导航 + 首页/列表/详情，无侧边栏 |
| H5 移动端 | `src/layouts/MobileLayout.vue` | MobileHomePage / MobileProfilePage | `/demo/h5`、`/demo/h5/profile` | 手机宽度 + 顶部栏 + 底部 Tab + 单列卡片 |

做某形态时：页面包对应 layout、照对应样板页抄结构；品牌取自 `productProfile`，主题色取自 `appConfig.primaryColor`。demo 路由都是 `meta.public`（免登录可看）。
