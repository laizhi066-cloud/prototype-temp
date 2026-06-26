<script setup>
import { reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { useAuthStore } from '../stores/auth'
import { appConfig } from '../config/appConfig'
import { productProfile } from '../config/productProfile'

const router = useRouter()
const route = useRoute()
const auth = useAuthStore()
const formRef = ref()

const form = reactive({
  account: appConfig.defaultAccount,
  password: appConfig.defaultPassword,
})

const rules = {
  account: [{ required: true, message: '请输入账号', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
}

async function submit() {
  await formRef.value.validate()
  try {
    await auth.login(form)
    ElMessage.success(`已进入${productProfile.productName}`)
    router.push(route.query.redirect || '/')
  } catch (error) {
    ElMessage.error(error.message)
  }
}
</script>

<template>
  <main class="login-page">
    <section class="login-card" aria-label="系统登录">
      <div class="brand-header">
        <div class="brand-mark">{{ productProfile.brandMark }}</div>
        <p class="eyebrow">{{ productProfile.loginEyebrow }}</p>
        <h1>{{ productProfile.productName }}</h1>
        <p class="intro">{{ productProfile.loginIntro }}</p>
      </div>

      <el-form ref="formRef" :model="form" :rules="rules" label-position="top">
        <el-form-item label="账号" prop="account">
          <el-input v-model="form.account" size="large" autocomplete="username" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            v-model="form.password"
            size="large"
            show-password
            autocomplete="current-password"
          />
        </el-form-item>
        <el-button
          type="primary"
          size="large"
          class="login-button"
          :loading="auth.loading"
          @click="submit"
        >
          登录系统
        </el-button>
      </el-form>

      <p class="login-note">当前账号用于本地验证，正式接入时替换为企业登录。</p>
      <p class="login-note">
        想看其它形态？<a href="/demo">后台 / C 端 / H5 形态画廊 →</a>
      </p>
    </section>
  </main>
</template>

<style scoped>
.login-page {
  display: grid;
  min-height: 100vh;
  place-items: center;
  padding: 24px;
  background:
    radial-gradient(circle at 50% 0%, rgba(29, 78, 216, 0.08), transparent 34%),
    #f3f4f6;
}

.login-card {
  width: min(392px, 100%);
  padding: 32px;
  border: 1px solid #d8dee8;
  border-radius: 8px;
  background: #ffffff;
  box-shadow: 0 20px 48px rgba(15, 23, 42, 0.1);
}

.brand-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 26px;
  text-align: center;
}

.brand-mark {
  display: grid;
  width: 42px;
  height: 42px;
  place-items: center;
  border-radius: 8px;
  background: v-bind('appConfig.primaryColor');
  color: #ffffff;
  font-size: 18px;
  font-weight: 800;
  box-shadow: 0 12px 24px rgba(29, 78, 216, 0.22);
}

.eyebrow {
  margin: 12px 0 4px;
  color: v-bind('appConfig.primaryColor');
  font-size: 12px;
  font-weight: 700;
}

h1 {
  margin: 0;
  color: #111827;
  font-size: 24px;
  line-height: 1.18;
}

.intro {
  max-width: 300px;
  margin: 12px 0 0;
  color: #4b5563;
  font-size: 13px;
  line-height: 1.6;
}

.login-note {
  margin: 12px 0 0;
  color: #6b7280;
  font-size: 12px;
  line-height: 1.5;
  text-align: center;
}

.login-button {
  width: 100%;
  font-weight: 600;
}

@media (max-width: 860px) {
  .login-page {
    padding: 20px;
  }

  h1 {
    font-size: 23px;
  }
}

@media (max-width: 520px) {
  .login-card {
    padding: 24px;
  }
}
</style>
