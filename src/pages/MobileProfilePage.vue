<script setup>
import { useRouter } from 'vue-router'
import {
  ArrowRight,
  Bell,
  ChatDotRound,
  CreditCard,
  InfoFilled,
  Location,
  Setting,
  User,
} from '@element-plus/icons-vue'
import { appConfig } from '../config/appConfig'
import MobileLayout from '../layouts/MobileLayout.vue'

// H5 个人中心 demo：用户卡 + 数据统计行 + 设置项列表。
// 全部为自带演示数据。
const router = useRouter()

const user = {
  name: '示例用户',
  desc: '普通会员 · ID 100086',
}

// 数据统计行
const stats = [
  { label: '待付款', value: 2 },
  { label: '待收货', value: 1 },
  { label: '优惠券', value: 5 },
  { label: '积分', value: 320 },
]

// 设置项列表（el-cell 风格，用 div 实现）
const cells = [
  { key: 'orders', label: '我的订单', icon: CreditCard, color: '#1d4ed8' },
  { key: 'address', label: '收货地址', icon: Location, color: '#10b981' },
  { key: 'message', label: '消息通知', icon: Bell, color: '#f59e0b', extra: '3' },
  { key: 'service', label: '在线客服', icon: ChatDotRound, color: '#06b6d4' },
  { key: 'setting', label: '设置', icon: Setting, color: '#64748b' },
  { key: 'about', label: '关于我们', icon: InfoFilled, color: '#8b5cf6' },
]

function openCell() {
  // 演示：列表项统一跳首页，接入真实子页改这里
  router.push('/demo/h5')
}
</script>

<template>
  <MobileLayout title="个人中心" active-tab="profile">
    <!-- 用户卡 -->
    <section class="p-user">
      <div class="p-avatar">
        <el-icon><User /></el-icon>
      </div>
      <div class="p-user-info">
        <div class="p-user-name">{{ user.name }}</div>
        <div class="p-user-desc">{{ user.desc }}</div>
      </div>
      <button type="button" class="p-user-edit" @click="openCell">
        编辑资料
      </button>
    </section>

    <!-- 数据统计行 -->
    <section class="p-stats card">
      <button
        v-for="s in stats"
        :key="s.label"
        type="button"
        class="p-stat"
        @click="openCell"
      >
        <span class="p-stat-value">{{ s.value }}</span>
        <span class="p-stat-label">{{ s.label }}</span>
      </button>
    </section>

    <!-- 设置项列表 -->
    <section class="p-cells card">
      <button
        v-for="cell in cells"
        :key="cell.key"
        type="button"
        class="p-cell"
        @click="openCell"
      >
        <span class="p-cell-icon" :style="{ background: cell.color }">
          <el-icon><component :is="cell.icon" /></el-icon>
        </span>
        <span class="p-cell-label">{{ cell.label }}</span>
        <span v-if="cell.extra" class="p-cell-badge">{{ cell.extra }}</span>
        <el-icon class="p-cell-arrow"><ArrowRight /></el-icon>
      </button>
    </section>

    <div class="p-tip">原型演示页 · 数据均为示例</div>
  </MobileLayout>
</template>

<style scoped>
.card {
  border-radius: 12px;
  background: #ffffff;
  box-shadow: 0 1px 2px rgba(17, 24, 39, 0.04);
}

/* 用户卡 */
.p-user {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 24px 18px;
  background: v-bind('appConfig.primaryColor');
  color: #ffffff;
}

.p-avatar {
  display: grid;
  width: 58px;
  height: 58px;
  place-items: center;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.22);
  font-size: 30px;
}

.p-user-info {
  flex: 1;
  min-width: 0;
}

.p-user-name {
  font-size: 18px;
  font-weight: 700;
}

.p-user-desc {
  margin-top: 4px;
  font-size: 13px;
  opacity: 0.88;
}

.p-user-edit {
  padding: 6px 14px;
  border: 1px solid rgba(255, 255, 255, 0.6);
  border-radius: 16px;
  background: transparent;
  color: #ffffff;
  font-size: 12px;
  cursor: pointer;
}

/* 统计行 */
.p-stats {
  display: flex;
  margin: -14px 12px 0;
  padding: 16px 0;
}

.p-stat {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  border: 0;
  background: transparent;
  cursor: pointer;
}

.p-stat-value {
  font-size: 18px;
  font-weight: 800;
  color: #1f2937;
}

.p-stat-label {
  font-size: 12px;
  color: #9aa0a6;
}

/* 设置项列表 */
.p-cells {
  margin: 12px;
  overflow: hidden;
}

.p-cell {
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  /* 大点击区 */
  height: 52px;
  padding: 0 14px;
  border: 0;
  border-bottom: 1px solid #f3f4f6;
  background: transparent;
  cursor: pointer;
}

.p-cell:last-child {
  border-bottom: 0;
}

.p-cell-icon {
  display: grid;
  width: 30px;
  height: 30px;
  place-items: center;
  border-radius: 8px;
  color: #ffffff;
  font-size: 17px;
}

.p-cell-label {
  flex: 1;
  text-align: left;
  font-size: 15px;
  color: #1f2937;
}

.p-cell-badge {
  display: grid;
  min-width: 18px;
  height: 18px;
  padding: 0 5px;
  place-items: center;
  border-radius: 9px;
  background: #ef4444;
  color: #ffffff;
  font-size: 11px;
}

.p-cell-arrow {
  color: #c0c4cc;
  font-size: 15px;
}

.p-tip {
  padding: 20px 0 12px;
  text-align: center;
  font-size: 12px;
  color: #b0b4ba;
}
</style>
