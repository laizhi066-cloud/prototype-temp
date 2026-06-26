<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { ArrowLeft, Check, Star } from '@element-plus/icons-vue'
import ConsumerLayout from '../layouts/ConsumerLayout.vue'

// C 端详情页 demo —— 内置演示数据，不依赖后台接口。
const router = useRouter()

const product = {
  title: '家庭深度保洁 4 小时',
  subtitle: '专业团队上门 · 厨卫客厅全屋清洁',
  price: 199,
  origin: 299,
  rating: 4.9,
  sold: 2300,
  cover: '家庭深度保洁',
  specs: [
    { label: '服务时长', value: '4 小时' },
    { label: '上门人数', value: '2 人' },
    { label: '覆盖区域', value: '同城主城区' },
    { label: '可预约', value: '次日起' },
  ],
  highlights: [
    '专业持证保洁师，统一着装上门',
    '环保清洁用品，去油去霉除菌',
    '厨房、卫生间、客厅、卧室全屋覆盖',
    '不满意可免费返工一次',
  ],
  description:
    '本服务提供家庭深度保洁，适合换季大扫除、入住前清洁或租房退租场景。保洁师携带专业设备与环保清洁剂上门，对厨房油污、卫生间水垢、玻璃门窗、地面边角进行重点清理，让居家环境焕然一新。下单后客服将在 30 分钟内与您确认上门时间与地址。',
}

const qty = ref(1)

function goBack() {
  router.back()
}

function buyNow() {
  ElMessage.success(`已加入订单：${product.title} ×${qty.value}（演示）`)
}

function addCart() {
  ElMessage.success('已加入购物车（演示）')
}
</script>

<template>
  <ConsumerLayout>
    <div class="detail-back">
      <el-button :icon="ArrowLeft" text @click="goBack">返回</el-button>
    </div>

    <!-- 主图 + 信息 -->
    <section class="detail-top">
      <div class="detail-gallery">
        <div class="detail-cover">{{ product.cover }}</div>
        <div class="detail-thumbs">
          <div v-for="n in 4" :key="n" class="detail-thumb">图 {{ n }}</div>
        </div>
      </div>

      <div class="detail-info">
        <h1 class="detail-title">{{ product.title }}</h1>
        <p class="detail-subtitle">{{ product.subtitle }}</p>

        <div class="detail-meta">
          <span class="detail-rating">
            <el-icon><Star /></el-icon>{{ product.rating }}
          </span>
          <span class="detail-sold">已售 {{ product.sold }}</span>
        </div>

        <div class="detail-price-box">
          <span class="detail-price">¥{{ product.price }}</span>
          <span class="detail-origin">¥{{ product.origin }}</span>
          <el-tag type="danger" effect="light" size="small" round>限时直降</el-tag>
        </div>

        <!-- 属性 -->
        <ul class="detail-specs">
          <li v-for="s in product.specs" :key="s.label">
            <span class="spec-label">{{ s.label }}</span>
            <span class="spec-value">{{ s.value }}</span>
          </li>
        </ul>

        <div class="detail-qty">
          <span class="qty-label">数量</span>
          <el-input-number v-model="qty" :min="1" :max="10" size="small" />
        </div>

        <!-- 主操作（宽屏内联） -->
        <div class="detail-cta">
          <el-button size="large" round @click="addCart">加入购物车</el-button>
          <el-button type="primary" size="large" round @click="buyNow">
            立即购买 · ¥{{ product.price * qty }}
          </el-button>
        </div>
      </div>
    </section>

    <!-- 服务亮点 -->
    <section class="detail-block">
      <h2 class="detail-block-title">服务亮点</h2>
      <ul class="detail-highlights">
        <li v-for="h in product.highlights" :key="h">
          <el-icon class="hl-icon"><Check /></el-icon>{{ h }}
        </li>
      </ul>
    </section>

    <!-- 详情描述 -->
    <section class="detail-block">
      <h2 class="detail-block-title">服务详情</h2>
      <p class="detail-desc">{{ product.description }}</p>
    </section>

    <!-- 底部固定主操作（窄屏） -->
    <div class="detail-bar">
      <div class="bar-price">
        <span class="bar-price-num">¥{{ product.price * qty }}</span>
        <span class="bar-price-tip">含 {{ qty }} 份服务</span>
      </div>
      <el-button class="bar-cart" round @click="addCart">购物车</el-button>
      <el-button class="bar-buy" type="primary" round @click="buyNow">
        立即购买
      </el-button>
    </div>
  </ConsumerLayout>
</template>

<style scoped>
.detail-back {
  margin-bottom: 8px;
}

/* 顶部主图 + 信息 */
.detail-top {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 32px;
}

.detail-cover {
  display: grid;
  height: 360px;
  place-items: center;
  border-radius: 16px;
  background: linear-gradient(135deg, #dbeafe, #eef2ff);
  color: #475569;
  font-size: 22px;
  font-weight: 800;
}

.detail-thumbs {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
  margin-top: 12px;
}

.detail-thumb {
  display: grid;
  height: 64px;
  place-items: center;
  border-radius: 10px;
  background: #f1f5f9;
  color: #94a3b8;
  font-size: 13px;
}

.detail-title {
  margin: 0 0 8px;
  font-size: 26px;
  font-weight: 800;
  color: #0f172a;
}

.detail-subtitle {
  margin: 0 0 14px;
  color: #64748b;
  font-size: 15px;
}

.detail-meta {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 16px;
  font-size: 13px;
  color: #94a3b8;
}

.detail-rating {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  color: #f59e0b;
  font-weight: 700;
}

.detail-price-box {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px 18px;
  border-radius: 12px;
  background: #fff7f6;
}

.detail-price {
  color: #ef4444;
  font-size: 30px;
  font-weight: 800;
}

.detail-origin {
  color: #cbd5e1;
  font-size: 15px;
  text-decoration: line-through;
}

.detail-specs {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px 24px;
  margin: 22px 0;
  padding: 0;
  list-style: none;
}

.detail-specs li {
  display: flex;
  justify-content: space-between;
  padding-bottom: 8px;
  border-bottom: 1px dashed #e5e7eb;
}

.spec-label {
  color: #94a3b8;
  font-size: 14px;
}

.spec-value {
  color: #1f2937;
  font-size: 14px;
  font-weight: 600;
}

.detail-qty {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 22px;
}

.qty-label {
  color: #64748b;
  font-size: 14px;
}

.detail-cta {
  display: flex;
  gap: 12px;
}

.detail-cta .el-button {
  flex: 1;
}

/* 内容区块 */
.detail-block {
  margin-top: 36px;
}

.detail-block-title {
  margin: 0 0 16px;
  padding-left: 12px;
  border-left: 4px solid v-bind('"#2563eb"');
  font-size: 20px;
  font-weight: 800;
  color: #0f172a;
}

.detail-highlights {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px 24px;
  margin: 0;
  padding: 0;
  list-style: none;
}

.detail-highlights li {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #334155;
  font-size: 15px;
}

.hl-icon {
  color: #22c55e;
  font-weight: 700;
}

.detail-desc {
  margin: 0;
  color: #475569;
  font-size: 15px;
  line-height: 1.9;
}

/* 底部固定操作栏（仅窄屏显示） */
.detail-bar {
  display: none;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 30;
  align-items: center;
  gap: 10px;
  padding: 10px 14px;
  background: #ffffff;
  border-top: 1px solid #eceef1;
  box-shadow: 0 -6px 20px -12px rgba(15, 23, 42, 0.3);
}

.bar-price {
  display: flex;
  flex-direction: column;
  margin-right: auto;
}

.bar-price-num {
  color: #ef4444;
  font-size: 20px;
  font-weight: 800;
}

.bar-price-tip {
  color: #94a3b8;
  font-size: 11px;
}

/* 响应式 */
@media (max-width: 860px) {
  .detail-top {
    grid-template-columns: 1fr;
    gap: 20px;
  }

  .detail-cover {
    height: 260px;
  }

  .detail-specs,
  .detail-highlights {
    grid-template-columns: 1fr;
  }

  /* 窄屏隐藏内联主操作，改用底部固定栏 */
  .detail-cta {
    display: none;
  }

  .detail-bar {
    display: flex;
  }
}
</style>
