# 产品原型请求模板

把下面内容发给 AI，可以减少无效追问。

```text
请先读取 AGENTS.md。
请使用 product-prototype-orchestrator、project-intake-classifier、product-question-gate 和 product-theme-advisor。

产品想法：
[一句话描述要做什么]

目标用户：
[谁使用]

核心场景：
[用户为什么需要它，要完成什么]

必须包含：
[页面、流程、字段或状态]

可先默认：
[不确定的地方让 AI 按项目规则默认]

要求：
- 先判断项目类型和置信度。
- 先根据行业、用户、设备和信息密度推荐主题、配色、布局密度和登录页方向。
- 如果信息不够，只问一个最关键的问题。
- 不要问是否需要登录、头部、侧边栏、技术栈或组件库。
- 按项目默认骨架规划页面、路由、组件和 mock API。
- 登录页只保留 logo、系统名称、简单系统描述和登录表单。
- 实现后用 prototype-review 自查。
```

## 极简版

```text
请读取 AGENTS.md，并使用 product-prototype-orchestrator。
我想做一个 [产品想法]。
请先判断项目类型，推荐主题和默认骨架。
如果信息不够，只问我一个最关键的问题。
不要问登录、头部、侧边栏等默认配置。
确认后直接实现可运行原型。
```

