<script setup>
import { useRouter } from 'vue-router'
import {
  Bowl,
  Box,
  Briefcase,
  House,
  Star,
  Van,
} from '@element-plus/icons-vue'
import ConsumerLayout from '../layouts/ConsumerLayout.vue'

// C 端首页 demo —— 全部为组件内置演示数据，不依赖后台 orderApi。
const router = useRouter()

// 顶部轮播 banner
const banners = [
  { title: '新人专享 · 首单立减 30 元', desc: '注册即领大额优惠券', bg: '#1d4ed8' },
  { title: '同城极速达 · 最快 30 分钟', desc: '热门好物，今日下单今日送', bg: '#0ea5e9' },
  { title: '品质生活服务 · 一站搞定', desc: '家政 / 维修 / 配送全都有', bg: '#7c3aed' },
]

// 分类 / 服务网格
const categories = [
  { name: '到家服务', desc: '保洁·维修·搬家', icon: House },
  { name: '生鲜美食', desc: '当日配送到家', icon: Bowl },
  { name: '极速配送', desc: '同城 30 分钟达', icon: Van },
  { name: '商务办公', desc: '打印·快递·租赁', icon: Briefcase },
  { name: '好物优选', desc: '精选品质单品', icon: Box },
  { name: '会员特权', desc: '专属折扣与积分', icon: Star },
]

// 热门列表
const hotItems = [
  {
    title: '家庭深度保洁 4 小时',
    tag: '人气王',
    price: 199,
    origin: 299,
    rating: 4.9,
    sold: 2300,
    desc: '专业团队上门，厨卫客厅全屋清洁',
  },
  {
    title: '当季有机蔬菜礼盒',
    tag: '今日特价',
    price: 59,
    origin: 89,
    rating: 4.8,
    sold: 5600,
    desc: '基地直采，下单后冷链当日送达',
  },
  {
    title: '空调清洗保养（单台）',
    tag: '已售过万',
    price: 88,
    origin: 128,
    rating: 4.7,
    sold: 12800,
    desc: '深度拆洗，去霉除菌，附赠检测',
  },
  {
    title: '同城极速代办跑腿',
    tag: '极速达',
    price: 15,
    origin: 25,
    rating: 4.9,
    sold: 8900,
    desc: '取送文件、买药买花，最快 30 分钟',
  },
]

function openDetail() {
  router.push('/demo/consumer/detail')
}
</script>

<template>
  <ConsumerLayout>
    <!-- Hero 区 -->
    <section class="hero">
      <div class="hero-text">
        <p class="hero-eyebrow">品质生活 · 触手可及</p>
        <h1 class="hero-title">一个 App，搞定身边所有服务</h1>
        <p class="hero-sub">
          从生鲜配送到上门服务，精选好商家与好商品，下单更省心，到家更安心。
        </p>
        <div class="hero-actions">
          <el-button type="primary" size="large" round @click="openDetail">
            立即体验
          </el-button>
          <el-button size="large" round @click="openDetail">浏览热门</el-button>
        </div>
        <div class="hero-stats">
          <div><strong>1200+</strong><span>合作商家</span></div>
          <div><strong>50万+</strong><span>服务用户</span></div>
          <div><strong>4.9</strong><span>平均评分</span></div>
        </div>
      </div>

      <div class="hero-banner">
        <el-carousel height="240px" :interval="3500" arrow="hover">
          <el-carousel-item v-for="b in banners" :key="b.title">
            <div class="banner-slide" :style="{ background: b.bg }">
              <h3>{{ b.title }}</h3>
              <p>{{ b.desc }}</p>
            </div>
          </el-carousel-item>
        </el-carousel>
      </div>
    </section>

    <!-- 分类 / 服务卡片网格 -->
    <section class="block">
      <div class="block-head">
        <h2 class="block-title">热门分类</h2>
        <span class="block-more" @click="openDetail">查看全部 ›</span>
      </div>
      <el-row :gutter="16">
        <el-col
          v-for="cat in categories"
          :key="cat.name"
          :xs="12"
          :sm="8"
          :md="4"
        >
          <el-card
            class="cat-card"
            shadow="hover"
            :body-style="{ padding: '18px 14px' }"
            @click="openDetail"
          >
            <div class="cat-icon">
              <el-icon><component :is="cat.icon" /></el-icon>
            </div>
            <div class="cat-name">{{ cat.name }}</div>
            <div class="cat-desc">{{ cat.desc }}</div>
          </el-card>
        </el-col>
      </el-row>
    </section>

    <!-- 热门列表 -->
    <section class="block">
      <div class="block-head">
        <h2 class="block-title">热门推荐</h2>
        <span class="block-more" @click="openDetail">更多好物 ›</span>
      </div>
      <el-row :gutter="16">
        <el-col
          v-for="item in hotItems"
          :key="item.title"
          :xs="24"
          :sm="12"
          :md="6"
        >
          <el-card
            class="hot-card"
            shadow="hover"
            :body-style="{ padding: '0' }"
            @click="openDetail"
          >
            <div class="hot-cover">
              <el-tag class="hot-tag" type="danger" effect="dark" size="small">
                {{ item.tag }}
              </el-tag>
              <span class="hot-cover-text">{{ item.title }}</span>
            </div>
            <div class="hot-body">
              <div class="hot-title">{{ item.title }}</div>
              <div class="hot-desc">{{ item.desc }}</div>
              <div class="hot-meta">
                <span class="hot-rating">
                  <el-icon><Star /></el-icon>{{ item.rating }}
                </span>
                <span class="hot-sold">已售 {{ item.sold }}</span>
              </div>
              <div class="hot-price-row">
                <span class="hot-price">¥{{ item.price }}</span>
                <span class="hot-origin">¥{{ item.origin }}</span>
                <el-button class="hot-buy" type="primary" size="small" round>
                  立即购买
                </el-button>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </section>
  </ConsumerLayout>
</template>

<style scoped>
/* Hero */
.hero {
  display: grid;
  grid-template-columns: 1.1fr 1fr;
  gap: 36px;
  align-items: center;
  padding: 12px 0 8px;
}

.hero-eyebrow {
  margin: 0 0 10px;
  color: #2563eb;
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 1px;
}

.hero-title {
  margin: 0 0 14px;
  font-size: 38px;
  line-height: 1.2;
  font-weight: 800;
  color: #0f172a;
}

.hero-sub {
  margin: 0 0 22px;
  max-width: 460px;
  color: #64748b;
  font-size: 16px;
  line-height: 1.7;
}

.hero-actions {
  display: flex;
  gap: 12px;
  margin-bottom: 26px;
}

.hero-stats {
  display: flex;
  gap: 36px;
}

.hero-stats div {
  display: flex;
  flex-direction: column;
}

.hero-stats strong {
  font-size: 24px;
  font-weight: 800;
  color: #0f172a;
}

.hero-stats span {
  margin-top: 2px;
  color: #94a3b8;
  font-size: 13px;
}

.hero-banner {
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 18px 40px -22px rgba(15, 23, 42, 0.45);
}

.banner-slide {
  display: flex;
  height: 100%;
  flex-direction: column;
  justify-content: center;
  padding: 0 34px;
  color: #ffffff;
}

.banner-slide h3 {
  margin: 0 0 10px;
  font-size: 26px;
  font-weight: 800;
}

.banner-slide p {
  margin: 0;
  font-size: 15px;
  opacity: 0.92;
}

/* 区块通用 */
.block {
  margin-top: 40px;
}

.block-head {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  margin-bottom: 16px;
}

.block-title {
  margin: 0;
  font-size: 22px;
  font-weight: 800;
  color: #0f172a;
}

.block-more {
  cursor: pointer;
  color: #64748b;
  font-size: 14px;
}

.block-more:hover {
  color: #2563eb;
}

/* 分类卡片 */
.cat-card {
  margin-bottom: 16px;
  cursor: pointer;
  text-align: center;
  border-radius: 14px;
  transition: transform 0.15s ease;
}

.cat-card:hover {
  transform: translateY(-3px);
}

.cat-icon {
  display: grid;
  width: 50px;
  height: 50px;
  margin: 0 auto 10px;
  place-items: center;
  border-radius: 14px;
  background: #eff4ff;
  color: #2563eb;
  font-size: 24px;
}

.cat-name {
  font-size: 15px;
  font-weight: 700;
  color: #0f172a;
}

.cat-desc {
  margin-top: 4px;
  color: #94a3b8;
  font-size: 12px;
}

/* 热门卡片 */
.hot-card {
  margin-bottom: 16px;
  cursor: pointer;
  overflow: hidden;
  border-radius: 14px;
  transition: transform 0.15s ease;
}

.hot-card:hover {
  transform: translateY(-3px);
}

.hot-cover {
  position: relative;
  display: grid;
  height: 140px;
  place-items: center;
  padding: 0 16px;
  background: linear-gradient(135deg, #dbeafe, #eef2ff);
  text-align: center;
}

.hot-cover-text {
  color: #475569;
  font-size: 15px;
  font-weight: 700;
}

.hot-tag {
  position: absolute;
  top: 10px;
  left: 10px;
}

.hot-body {
  padding: 14px;
}

.hot-title {
  font-size: 15px;
  font-weight: 700;
  color: #0f172a;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.hot-desc {
  margin: 6px 0 10px;
  height: 38px;
  color: #94a3b8;
  font-size: 13px;
  line-height: 1.5;
  overflow: hidden;
}

.hot-meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
  font-size: 12px;
  color: #94a3b8;
}

.hot-rating {
  display: inline-flex;
  align-items: center;
  gap: 3px;
  color: #f59e0b;
  font-weight: 700;
}

.hot-price-row {
  display: flex;
  align-items: center;
  gap: 8px;
}

.hot-price {
  color: #ef4444;
  font-size: 18px;
  font-weight: 800;
}

.hot-origin {
  color: #cbd5e1;
  font-size: 13px;
  text-decoration: line-through;
}

.hot-buy {
  margin-left: auto;
}

/* 响应式 */
@media (max-width: 860px) {
  .hero {
    grid-template-columns: 1fr;
    gap: 22px;
  }

  .hero-title {
    font-size: 28px;
  }

  .hero-stats {
    gap: 24px;
  }
}
</style>
