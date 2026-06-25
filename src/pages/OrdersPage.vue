<script setup>
import { computed, reactive, ref, watch } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { useRoute } from 'vue-router'
import AppLayout from '../layouts/AppLayout.vue'
import { orderApi } from '../mock/mockApi'

const route = useRoute()
const loading = ref(false)
const rows = ref([])
const total = ref(0)
const dialogVisible = ref(false)
const editingId = ref('')
const formRef = ref()

const filters = reactive({
  keyword: '',
  status: '',
})

const form = reactive({
  customer: '',
  amount: 0,
  channel: '线上转化',
  status: 'pending',
})

const rules = {
  customer: [{ required: true, message: '请输入客户名称', trigger: 'blur' }],
  amount: [{ required: true, message: '请输入订单金额', trigger: 'blur' }],
}

const metrics = computed(() => {
  const paidAmount = rows.value
    .filter((row) => row.status === 'paid' || row.status === 'shipped')
    .reduce((sum, row) => sum + Number(row.amount), 0)
  return [
    { label: '订单总数', value: total.value },
    { label: '已完成金额', value: `¥${paidAmount.toLocaleString()}` },
    { label: '待处理', value: rows.value.filter((row) => row.status === 'pending').length },
    { label: '当前筛选', value: currentStatusLabel.value },
  ]
})

const statusMap = {
  pending: { label: '待处理', type: 'warning' },
  paid: { label: '已付款', type: 'success' },
  shipped: { label: '已发货', type: 'primary' },
}

const pageTitle = computed(() => route.meta.title || '订单管理')
const pageSubtitle = computed(
  () =>
    route.meta.subtitle ||
    '集中查看订单进度，支持按客户、订单号和状态快速筛选，并完成新增、编辑和删除。',
)

const currentStatusLabel = computed(() => {
  if (!filters.status) return '全部'
  return statusMap[filters.status]?.label || filters.status
})

async function loadOrders() {
  loading.value = true
  try {
    const result = await orderApi.list(filters)
    rows.value = result.rows
    total.value = result.total
  } catch {
    ElMessage.error('订单加载失败，请稍后重试')
  } finally {
    loading.value = false
  }
}

function openCreate() {
  editingId.value = ''
  Object.assign(form, {
    customer: '',
    amount: 0,
    channel: '线上转化',
    status: 'pending',
  })
  dialogVisible.value = true
}

function openEdit(row) {
  editingId.value = row.id
  Object.assign(form, row)
  dialogVisible.value = true
}

async function submit() {
  await formRef.value.validate()
  if (editingId.value) {
    await orderApi.update(editingId.value, { ...form })
    ElMessage.success('订单已更新')
  } else {
    await orderApi.create({ ...form })
    ElMessage.success('订单已创建')
  }
  dialogVisible.value = false
  loadOrders()
}

async function remove(row) {
  await ElMessageBox.confirm(`确认删除 ${row.id}？`, '删除订单', {
    type: 'warning',
  })
  await orderApi.remove(row.id)
  ElMessage.success('订单已删除')
  loadOrders()
}

function resetDemoData() {
  orderApi.reset()
  ElMessage.success('已恢复默认订单数据')
  loadOrders()
}

watch(
  () => route.name,
  () => {
    filters.status = route.meta.status || ''
    loadOrders()
  },
  { immediate: true },
)
</script>

<template>
  <AppLayout>
    <div class="page-header">
      <div>
        <h1 class="page-title">{{ pageTitle }}</h1>
        <p class="page-subtitle">{{ pageSubtitle }}</p>
      </div>
      <el-button type="primary" @click="openCreate">新增订单</el-button>
    </div>

    <section class="metric-grid">
      <div v-for="metric in metrics" :key="metric.label" class="metric-card">
        <div class="metric-label">{{ metric.label }}</div>
        <div class="metric-value">{{ metric.value }}</div>
      </div>
    </section>

    <el-card class="content-card" shadow="never">
      <div class="toolbar">
        <div class="toolbar-left">
          <el-input
            v-model="filters.keyword"
            clearable
            placeholder="搜索订单号 / 客户"
            style="width: 240px"
            @keyup.enter="loadOrders"
          />
          <el-select
            v-model="filters.status"
            clearable
            placeholder="订单状态"
            style="width: 160px"
          >
            <el-option label="待处理" value="pending" />
            <el-option label="已付款" value="paid" />
            <el-option label="已发货" value="shipped" />
          </el-select>
          <el-button @click="loadOrders">查询</el-button>
        </div>
        <div class="toolbar-right">
          <el-button @click="resetDemoData">重置订单数据</el-button>
        </div>
      </div>

      <el-table
        v-loading="loading"
        :data="rows"
        empty-text="暂无订单，点击新增订单创建一条订单记录"
      >
        <el-table-column prop="id" label="订单号" min-width="130" />
        <el-table-column prop="customer" label="客户" min-width="180" />
        <el-table-column prop="channel" label="渠道" min-width="120" />
        <el-table-column label="金额" min-width="120">
          <template #default="{ row }">¥{{ Number(row.amount).toLocaleString() }}</template>
        </el-table-column>
        <el-table-column label="状态" min-width="120">
          <template #default="{ row }">
            <el-tag :type="statusMap[row.status]?.type">
              {{ statusMap[row.status]?.label }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="createdAt" label="创建日期" min-width="120" />
        <el-table-column label="操作" width="160" fixed="right">
          <template #default="{ row }">
            <el-button link type="primary" @click="openEdit(row)">编辑</el-button>
            <el-button link type="danger" @click="remove(row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <div class="pagination-row">
        <el-pagination
          layout="total, prev, pager, next"
          :page-size="10"
          :total="total"
        />
      </div>
    </el-card>

    <el-dialog
      v-model="dialogVisible"
      :title="editingId ? '编辑订单' : '新增订单'"
      width="520px"
    >
      <el-form ref="formRef" :model="form" :rules="rules" label-position="top">
        <el-form-item label="客户名称" prop="customer">
          <el-input v-model="form.customer" />
        </el-form-item>
        <el-form-item label="订单金额" prop="amount">
          <el-input-number v-model="form.amount" :min="0" style="width: 100%" />
        </el-form-item>
        <el-form-item label="渠道">
          <el-select v-model="form.channel" style="width: 100%">
            <el-option label="线上转化" value="线上转化" />
            <el-option label="企业客户" value="企业客户" />
            <el-option label="销售录入" value="销售录入" />
          </el-select>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="form.status" style="width: 100%">
            <el-option label="待处理" value="pending" />
            <el-option label="已付款" value="paid" />
            <el-option label="已发货" value="shipped" />
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="submit">保存</el-button>
      </template>
    </el-dialog>
  </AppLayout>
</template>

<style scoped>
.pagination-row {
  display: flex;
  justify-content: flex-end;
  padding-top: 16px;
}
</style>
