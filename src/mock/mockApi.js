import { readStorage, removeStorage, writeStorage } from './storage'
import { appConfig } from '../config/appConfig'

const defaultOrders = [
  {
    id: 'ORD-240601',
    customer: '上海星河科技',
    amount: 12800,
    status: 'pending',
    channel: '企业客户',
    createdAt: '2026-06-18',
  },
  {
    id: 'ORD-240602',
    customer: '杭州云帆贸易',
    amount: 8600,
    status: 'paid',
    channel: '线上转化',
    createdAt: '2026-06-19',
  },
  {
    id: 'ORD-240603',
    customer: '深圳远航供应链',
    amount: 24600,
    status: 'shipped',
    channel: '销售录入',
    createdAt: '2026-06-20',
  },
]

function delay(value, ms = 450) {
  return new Promise((resolve) => {
    window.setTimeout(() => resolve(value), ms)
  })
}

function readOrders() {
  return readStorage('orders', defaultOrders)
}

function saveOrders(orders) {
  writeStorage('orders', orders)
}

export const authApi = {
  getSession() {
    return readStorage('session', null)
  },

  async login({ account, password }) {
    if (!account || !password) {
      throw new Error('请输入账号和密码')
    }

    const session = {
      id: 'user-001',
      name: account,
      role: appConfig.demoUserRole,
    }
    writeStorage('session', session)
    return delay(session)
  },

  logout() {
    removeStorage('session')
  },
}

export const orderApi = {
  async list({ keyword = '', status = '' } = {}) {
    const normalizedKeyword = keyword.trim().toLowerCase()
    const rows = readOrders().filter((order) => {
      const matchKeyword =
        !normalizedKeyword ||
        order.id.toLowerCase().includes(normalizedKeyword) ||
        order.customer.toLowerCase().includes(normalizedKeyword)
      const matchStatus = !status || order.status === status
      return matchKeyword && matchStatus
    })

    return delay({
      rows,
      total: rows.length,
    })
  },

  async create(payload) {
    const orders = readOrders()
    const nextOrder = {
      ...payload,
      id: `ORD-${Date.now().toString().slice(-6)}`,
      createdAt: new Date().toISOString().slice(0, 10),
    }
    saveOrders([nextOrder, ...orders])
    return delay(nextOrder)
  },

  async update(id, payload) {
    const orders = readOrders().map((order) =>
      order.id === id ? { ...order, ...payload } : order,
    )
    saveOrders(orders)
    return delay(orders.find((order) => order.id === id))
  },

  async remove(id) {
    saveOrders(readOrders().filter((order) => order.id !== id))
    return delay({ success: true })
  },

  reset() {
    saveOrders(defaultOrders)
  },
}
