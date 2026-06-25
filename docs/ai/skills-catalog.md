# 产品团队 AI Skills Catalog

这个项目把 AI 协作规则放在项目内，产品同事推到远程后，Codex、OpenCode、Claude、Cursor 等工具都可以通过 `AGENTS.md` 和 skills 目录读取同一套规则。

## 推荐调用方式

- 新产品想法：使用 `product-prototype-orchestrator`
- 判断项目类型：使用 `project-intake-classifier`
- 产品主题推荐：使用 `product-theme-advisor`
- 切换具体产品上下文：使用 `product-context`
- 控制 AI 追问：使用 `product-question-gate`
- 后台原型开发：使用 `element-plus-prototype`
- 新增业务模块：使用 `feature-module-template`
- 修改产品名称/品牌/默认登录：使用 `brand-config`
- 模拟前后端交互：使用 `mock-api-localstorage`
- 环境搭建/跑不起来：使用 `environment-bootstrap`
- 原型验收：使用 `prototype-review`

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
```

```text
使用 product-prototype-orchestrator。
我想做一个手机端活动报名页，请按 H5 原型处理，给出页面流程并实现可点击 Demo。
```

```text
使用 product-context。
把当前示例切换成“会员运营后台”，目标用户是运营人员，侧边栏包含会员管理、权益配置、活动触达、数据看板。
```

```text
使用 feature-module-template。
给后台原型增加一个客户管理模块。请先列出页面、路由、字段、mockApi 和验收标准，再实现。
```

```text
使用 brand-config。
把这个原型改成“星河 CRM”，默认登录账号改成 pm.demo，密码改成 demo123。
```

```text
使用 prototype-review。
请从产品目标、交互完整性、视觉一致性、状态覆盖和 mock 数据合理性检查当前原型。
```

```text
使用 environment-bootstrap。
我这个项目跑不起来，请先检查 Node.js、npm 和项目依赖，再帮我启动本地服务。
```

## 第三方 Skills

第三方 skills 的源码快照保存在 `vendor/skills`，来源和许可证记录见 `vendor/skills/SOURCES.md`。

核心项目规则以 `.agents/skills` 中的自定义 skills 为准；第三方 skills 作为方法库和设计辅助。
