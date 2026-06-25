import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { authApi } from '../mock/mockApi'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(authApi.getSession())
  const loading = ref(false)

  const isAuthenticated = computed(() => Boolean(user.value))

  async function login(payload) {
    loading.value = true
    try {
      user.value = await authApi.login(payload)
      return user.value
    } finally {
      loading.value = false
    }
  }

  function logout() {
    authApi.logout()
    user.value = null
  }

  return {
    user,
    loading,
    isAuthenticated,
    login,
    logout,
  }
})
