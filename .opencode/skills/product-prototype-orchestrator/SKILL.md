---
name: product-prototype-orchestrator
description: 产品经理提出新原型、扩展原型或迭代原型时使用。负责把原始想法串成项目类型识别、页面计划、UI 骨架、mock API 计划、实现和评审。
---

# 产品原型编排

这是产品原型请求的总流程。

## 工作流

1. 使用 `project-intake-classifier` 判断项目类型。
2. 使用 `product-question-gate` 控制追问。
3. 使用 `product-theme-advisor` 根据产品类型推荐主题、配色、布局密度和登录页方向。
4. 使用 `product-context` 更新当前产品上下文。
5. 把想法整理成目标用户、场景、页面、路由、交互、mock 数据和验收标准。
6. 后台 / SaaS / CRM / 数据看板页面使用 `element-plus-prototype`，侧边栏导航默认写入 `productProfile.navTree`。
7. 模拟后端行为放到 `mock-api-localstorage`。
8. 新增业务模块时使用 `feature-module-template`。
9. 修改品牌样式、主题或默认登录信息时使用 `brand-config`。
10. 完成前使用 `prototype-review` 评审。
11. 每轮真实产品需求、页面变更、模块新增或流程调整后，默认同步 `/prd` 对应 PRD 文档。
12. 原型确认或进入开发前，使用 `prd-development` 和 `development-handoff` 补齐开发交付包。
13. 通过验证后创建中文 Git commit，记录本轮原型变更，方便产品团队回溯。

## 实现说明格式

写代码前必须用中文输出：

- 项目类型：
- 默认假设：
- 主题推荐：
- 不采用的风格：
- 页面 / 路由：
- 共享布局 / 组件：
- mock API / localStorage：
- 验收标准：

## 完成规则

- 有效修改完成后必须运行必要验证，再提交 Git commit。
- commit 信息必须使用中文，例如：`完善订单管理原型`。
- 最终回复必须包含 commit 信息。
- 如果当前目录不是 Git 仓库，先初始化 Git；如果无法提交，必须说明原因。
- 提交前必须检查工作区变更，避免把与本轮无关的文件混入 commit。

## PRD 自动同步规则

- PM 不需要确认“是否写入 PRD”；真实产品变更默认写入 `docs/product/prds/`。
- `/prd` 是公开文档站，左侧目录树来自 `docs/product/prds/index.json`，正文来自 `docs/product/prds/*.md`。
- 新增模块时，同步补充 PRD 的页面清单、核心流程、字段 / 状态、验收标准和未决问题。
- 只有纯样式微调、规则文档修改或环境修复可以跳过 PRD，同步跳过原因必须写在最终回复中。

## 开发交付规则

- 当用户说“交给开发”“输出 PRD”“需求文档”“研发交付”“开发排期”“验收标准”时，必须生成开发交付包。
- 开发交付包至少包含：PRD、用户故事、页面清单、字段 / 状态规则、接口 / mock 数据说明、验收用例、开发任务拆分和未决问题。
- 文档默认保存到 `docs/product/prds/`、`docs/product/user-stories/`、`docs/product/development-handoffs/` 和 `docs/product/acceptance-cases/`。
