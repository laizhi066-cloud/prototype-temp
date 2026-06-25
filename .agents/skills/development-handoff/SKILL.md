---
name: development-handoff
description: 产品经理确认原型后，需要把原型交给开发、输出 PRD、用户故事、验收用例、接口数据说明、研发任务拆分或开发交付材料时使用。
---

# 开发交付包

原型只是沟通工具，交付开发时必须沉淀成可执行文档。

## 触发场景

- 用户说“交给开发”“输出 PRD”“需求文档”“研发交付”“开发排期”。
- 原型已经确认，需要开发团队评估或实现。
- 需要把页面、字段、状态和流程转成开发可读的需求。

## 交付包内容

默认产出 4 类文档：

1. `docs/product/prds/[产品名]-prd.md`
2. `docs/product/user-stories/[产品名]-user-stories.md`
3. `docs/product/development-handoffs/[产品名]-handoff.md`
4. `docs/product/acceptance-cases/[产品名]-acceptance-cases.md`

## 必须包含

- 背景和目标。
- 目标用户和使用场景。
- 范围和非范围。
- 页面清单和路由。
- 主流程、异常流程和边界场景。
- 字段说明、状态枚举和校验规则。
- mock API / 数据结构说明。
- 用户故事和 Gherkin 验收标准。
- 开发任务拆分和建议优先级。
- 依赖、风险、未决问题。

## 输出规则

- 文档用 UTF-8 中文。
- 不要让 PM 自己看代码整理需求。
- 可以引用原型页面，但不要把“看原型自己理解”当成交付说明。
- 完成后运行必要验证，并创建中文 commit。

