<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import {
  Goods,
  Headset,
  Money,
  Search,
  Service,
  Ticket,
  TrendCharts,
  Van,
  Wallet,
} from '@element-plus/icons-vue'
import { appConfig } from '../config/appConfig'
import MobileLayout from '../layouts/MobileLayout.vue'

// H5 首页 demo：搜索框 + 轮播 banner + 宫格入口 + 纵向卡片列表。
// 全部为自带演示数据，不依赖后台 orderApi。
const router = useRouter()

const keyword = ref('')

// 轮播 banner（用渐变色块代替图片，避免依赖外部资源）
const banners = [
  { id: 1, title: '新人专享', desc: '首单立减 20 元', from: '#1d4ed8', to: '#3b82f6' },
  { id: 2, title: '限时秒杀', desc: '精选好物 5 折起', from: '#7c3aed', to: '#a855f7' },
  { id: 3, title: '会员日', desc: '每周三双倍积分', from: '#0ea5e9', to: '#22d3ee' },
]

// 宫格入口（8 宫格，触控友好）
const grids = [
  { label: '全部分类', icon: Goods, color: '#1d4ed8' },
  { label: '限时秒杀', icon: TrendCharts, color: '#ef4444' },
  { label: '优惠券', icon: Ticket, color: '#f59e0b' },
  { label: '充值中心', icon: Wallet, color: '#10b981' },
  { label: '物流查询', icon: Van, color: '#6366f1' },
  { label: '在线客服', icon: Headset, color: '#06b6d4' },
  { label: '我的账单', icon: Money, color: '#8b5cf6' },
  { label: '更多服务', icon: Service, color: '#64748b' },
]

// 纵向卡片列表（商品/服务）
const cards = [
  {
    id: 'p1',
    title: '智能扫地机器人 Pro',
    desc: '激光导航 · 自动集尘 · 超长续航',
    price: 1299,
    origin: 1799,
    tag: '热销',
    from: '#dbeafe',
    to: '#bfdbfe',
  },
  {
    id: 'p2',
    title: '人体工学办公椅',
    desc: '护腰设计 · 透气网布 · 三档调节',
    price: 699,
    origin: 999,
    tag: '好评',
    from: '#fae8ff',
    to: '#f5d0fe',
  },
  {
    id: 'p3',
    title: '无线降噪蓝牙耳机',
    desc: '主动降噪 · 30 小时续航 · 低延迟',
    price: 459,
    origin: 599,
    tag: '新品',
    from: '#dcfce7',
    to: '#bbf7d0',
  },
  {
    id: 'p4',
    title: '便携咖啡机',
    desc: '一键萃取 · USB 充电 · 出差神器',
    price: 329,
    origin: 459,
    tag: '限量',
    from: '#fef3c7',
    to: '#fde68a',
  },
]

function onSearch() {
  // 演示：搜索仅做提示，接入真实搜索改这里
  router.push('/demo/h5')
}

function openGrid() {
  // 演示：宫格入口统一跳首页，接入真实功能改这里
  router.push('/demo/h5')
}

function openCard() {
  // 卡片点击 → 详情。脚手架阶段先指向自身首页，接入详情页改这里
  router.push('/demo/h5')
}
</script>

<template>
  <MobileLayout title="商城首页" active-tab="home">
    <!-- 搜索框 -->
    <div class="h-search-wrap">
      <div class="h-search">
        <el-icon class="h-search-icon"><Search /></el-icon>
        <input
          v-model="keyword"
          class="h-search-input"
          type="search"
          placeholder="搜索商品 / 服务"
          @keyup.enter="onSearch"
        />
      </div>
    </div>

    <!-- 轮播 banner -->
    <div class="h-banner">
      <el-carousel height="150px" :interval="3500" arrow="never" indicator-position="inside">
        <el-carousel-item v-for="b in banners" :key="b.id">
          <div
            class="h-banner-item"
            :style="{ background: `linear-gradient(135deg, ${b.from}, ${b.to})` }"
          >
            <div class="h-banner-title">{{ b.title }}</div>
            <div class="h-banner-desc">{{ b.desc }}</div>
          </div>
        </el-carousel-item>
      </el-carousel>
    </div>

    <!-- 宫格入口 -->
    <div class="h-grid card">
      <button
        v-for="g in grids"
        :key="g.label"
        type="button"
        class="h-grid-item"
        @click="openGrid"
      >
        <span class="h-grid-icon" :style="{ background: g.color }">
          <el-icon><component :is="g.icon" /></el-icon>
        </span>
        <span class="h-grid-label">{{ g.label }}</span>
      </button>
    </div>

    <!-- 纵向卡片列表 -->
    <div class="h-section-title">为你推荐</div>
    <div class="h-list">
      <button
        v-for="c in cards"
        :key="c.id"
        type="button"
        class="h-card card"
        @click="openCard"
      >
        <span
          class="h-card-thumb"
          :style="{ background: `linear-gradient(135deg, ${c.from}, ${c.to})` }"
        >
          <span class="h-card-thumb-tag">{{ c.tag }}</span>
        </span>
        <span class="h-card-body">
          <span class="h-card-title">{{ c.title }}</span>
          <span class="h-card-desc">{{ c.desc }}</span>
          <span class="h-card-price-row">
            <span class="h-card-price">¥{{ c.price }}</span>
            <span class="h-card-origin">¥{{ c.origin }}</span>
            <span class="h-card-buy">购买</span>
          </span>
        </span>
      </button>
    </div>
  </MobileLayout>
</template>

<style scoped>
.card {
  border-radius: 12px;
  background: #ffffff;
  box-shadow: 0 1px 2px rgba(17, 24, 39, 0.04);
}

/* 搜索框 */
.h-search-wrap {
  padding: 12px;
}

.h-search {
  display: flex;
  align-items: center;
  gap: 8px;
  height: 38px;
  padding: 0 14px;
  border-radius: 19px;
  background: #ffffff;
  box-shadow: 0 1px 2px rgba(17, 24, 39, 0.05);
}

.h-search-icon {
  color: #9aa0a6;
  font-size: 16px;
}

.h-search-input {
  flex: 1;
  border: 0;
  outline: none;
  background: transparent;
  font-size: 14px;
  color: #1f2937;
}

/* banner */
.h-banner {
  padding: 0 12px;
}

.h-banner-item {
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
  padding: 0 22px;
  border-radius: 12px;
  color: #ffffff;
}

.h-banner-title {
  font-size: 22px;
  font-weight: 800;
}

.h-banner-desc {
  margin-top: 6px;
  font-size: 14px;
  opacity: 0.92;
}

/* 宫格 */
.h-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px 0;
  margin: 12px;
  padding: 18px 8px;
}

.h-grid-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  border: 0;
  background: transparent;
  cursor: pointer;
}

.h-grid-icon {
  display: grid;
  width: 46px;
  height: 46px;
  place-items: center;
  border-radius: 14px;
  color: #ffffff;
  font-size: 22px;
}

.h-grid-label {
  font-size: 12px;
  color: #4b5563;
}

/* 列表区 */
.h-section-title {
  margin: 4px 16px 10px;
  font-size: 16px;
  font-weight: 700;
  color: #1f2937;
}

.h-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 0 12px;
}

.h-card {
  display: flex;
  gap: 12px;
  padding: 12px;
  text-align: left;
  border: 0;
  cursor: pointer;
}

.h-card-thumb {
  position: relative;
  flex-shrink: 0;
  width: 96px;
  height: 96px;
  border-radius: 10px;
}

.h-card-thumb-tag {
  position: absolute;
  top: 6px;
  left: 6px;
  padding: 1px 8px;
  border-radius: 8px;
  background: rgba(17, 24, 39, 0.55);
  color: #ffffff;
  font-size: 11px;
}

.h-card-body {
  display: flex;
  flex: 1;
  flex-direction: column;
  min-width: 0;
}

.h-card-title {
  font-size: 15px;
  font-weight: 600;
  color: #1f2937;
}

.h-card-desc {
  margin-top: 4px;
  font-size: 12px;
  color: #9aa0a6;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.h-card-price-row {
  display: flex;
  align-items: baseline;
  gap: 8px;
  margin-top: auto;
}

.h-card-price {
  color: #ef4444;
  font-size: 17px;
  font-weight: 800;
}

.h-card-origin {
  color: #c0c4cc;
  font-size: 12px;
  text-decoration: line-through;
}

.h-card-buy {
  margin-left: auto;
  padding: 5px 16px;
  border-radius: 16px;
  background: v-bind('appConfig.primaryColor');
  color: #ffffff;
  font-size: 13px;
}
</style>
