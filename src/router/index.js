import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import LoginPage from '../pages/LoginPage.vue'
import DashboardPage from '../pages/DashboardPage.vue'
import OrdersPage from '../pages/OrdersPage.vue'
import PlaceholderPage from '../pages/PlaceholderPage.vue'
import ProductPrdPage from '../pages/ProductPrdPage.vue'

const routes = [
  {
    path: '/login',
    name: 'login',
    component: LoginPage,
    meta: { public: true },
  },
  {
    path: '/',
    name: 'dashboard',
    component: DashboardPage,
  },
  {
    path: '/orders',
    name: 'orders',
    component: OrdersPage,
  },
  {
    path: '/orders/exceptions',
    name: 'order-exceptions',
    component: OrdersPage,
    meta: {
      title: '异常订单',
      subtitle: '优先查看待处理订单，跟进付款、发货和客户信息异常。',
      status: 'pending',
    },
  },
  {
    path: '/customers',
    name: 'customers',
    component: PlaceholderPage,
    meta: {
      title: '客户档案',
      subtitle: '维护客户基础信息、联系人和订单关联记录。',
      metrics: [
        { label: '重点客户', value: '12' },
        { label: '待完善档案', value: '4' },
        { label: '本周新增客户', value: '7' },
      ],
    },
  },
  {
    path: '/touch-records',
    name: 'touch-records',
    component: PlaceholderPage,
    meta: {
      title: '触达记录',
      subtitle: '记录运营触达、销售跟进和客户反馈结果。',
      metrics: [
        { label: '今日触达', value: '18' },
        { label: '待回访', value: '6' },
        { label: '已转订单', value: '3' },
      ],
    },
  },
  {
    path: '/analytics',
    name: 'analytics',
    component: PlaceholderPage,
    meta: {
      title: '数据看板',
      subtitle: '查看订单趋势、渠道转化和异常订单占比。',
      metrics: [
        { label: '订单转化率', value: '31%' },
        { label: '客单价', value: '¥15,333' },
        { label: '异常占比', value: '4.1%' },
      ],
    },
  },
  {
    path: '/prd',
    name: 'prd',
    component: ProductPrdPage,
    meta: { public: true },
  },
  {
    path: '/prd-preview',
    redirect: '/prd',
    meta: { public: true },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to) => {
  const auth = useAuthStore()
  if (!to.meta.public && !auth.isAuthenticated) {
    return { name: 'login', query: { redirect: to.fullPath } }
  }
  if (to.name === 'login' && auth.isAuthenticated) {
    return { name: 'dashboard' }
  }
  return true
})

export default router
