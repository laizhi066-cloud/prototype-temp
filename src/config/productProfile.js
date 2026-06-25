export const productProfile = {
  productName: '订单管理系统',
  shortName: '订单管理系统',
  brandMark: '订',
  subtitle: '运营后台',
  projectType: '后台管理',
  targetUser: '运营和销售团队',
  loginEyebrow: '运营后台',
  loginIntro: '统一处理订单查询、状态跟进、客户信息维护和异常订单协同。',
  themeRecommendation: {
    style: '克制型 B2B 运营后台',
    palette: '深色侧边栏、浅灰页面底、蓝色主操作、少量绿色成功态',
    density: '中高信息密度，优先表格、指标和待办队列',
    loginLayout: '居中登录表单，只展示标识、名称和一句系统描述',
  },
  workspaceTitle: '订单管理工作台',
  workspaceSubtitle: '关注待处理订单、交易进度和异常订单，帮助运营团队快速完成每日跟进。',
  headerHint: '订单状态实时更新',
  navTree: [
    { label: '工作台', path: '/', icon: 'House' },
    {
      label: '订单中心',
      icon: 'ShoppingCart',
      children: [
        { label: '订单列表', path: '/orders', icon: 'Document' },
        { label: '异常订单', path: '/orders/exceptions', icon: 'Warning' },
      ],
    },
    {
      label: '客户运营',
      icon: 'User',
      children: [
        { label: '客户档案', path: '/customers', icon: 'User' },
        { label: '触达记录', path: '/touch-records', icon: 'Document' },
      ],
    },
    {
      label: '经营分析',
      icon: 'DataAnalysis',
      children: [
        { label: '数据看板', path: '/analytics', icon: 'DataAnalysis' },
      ],
    },
  ],
  dashboardMetrics: [
    { label: '待处理订单', value: '8' },
    { label: '本周新增订单', value: '24' },
    { label: '已完成交易', value: '16' },
    { label: '异常订单', value: '1' },
  ],
  workspaceQueues: [
    { title: '待确认付款', count: 5, hint: '需要核对付款凭证和客户信息' },
    { title: '待安排发货', count: 3, hint: '优先处理企业客户订单' },
    { title: '售后协同', count: 2, hint: '跟进退款和补发申请' },
  ],
  riskAlerts: [
    { title: '深圳远航供应链订单金额较高', level: '高', owner: '销售录入' },
    { title: '杭州云帆贸易发票信息待补齐', level: '中', owner: '企业客户' },
  ],
  recentActivities: [
    { action: '新增订单', target: '上海星河科技', time: '10:24' },
    { action: '状态更新', target: '杭州云帆贸易已付款', time: '09:48' },
    { action: '异常标记', target: '深圳远航供应链待复核', time: '09:12' },
  ],
  prd: {
    version: 'V1.0',
    owner: '产品团队',
    goal: '帮助运营和销售团队统一处理订单查询、状态跟进、客户信息维护和异常订单协同。',
    scope: [
      '登录后进入订单管理工作台',
      '查看订单列表、筛选订单、创建订单、编辑订单和删除订单',
      '查看异常订单并进入后续复核流程',
      '通过客户运营和经营分析入口承接后续模块扩展',
    ],
    outOfScope: [
      '真实企业统一登录接入',
      '真实后端接口和权限系统',
      '财务结算、发票和仓储系统深度集成',
    ],
    acceptance: [
      '运营人员可以登录系统并进入工作台',
      '订单列表支持查询、新增、编辑、删除和分页',
      '异常订单有独立入口，便于优先处理',
      '核心流程包含加载态、空状态、表单校验、成功反馈和危险操作确认',
    ],
    handoffFiles: [
      'docs/product/prds/',
      'docs/product/user-stories/',
      'docs/product/development-handoffs/',
      'docs/product/acceptance-cases/',
    ],
  },
}
