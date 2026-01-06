import { defineStore } from 'pinia'
import { ref } from 'vue'
import api from '../services/api'
import router from '../router'

export const useAuthStore = defineStore('auth', () => {
  const token = ref(localStorage.getItem('token') || '')

  async function login(email: string, password: string) {
    try {
      const response = await api.post('/auth/login', { email, password })
      token.value = response.data.accessToken
      localStorage.setItem('token', token.value)
      router.push('/records')
    } catch (error) {
      throw error
    }
  }

  function logout() {
    token.value = ''
    localStorage.removeItem('token')
    router.push('/login')
  }

  return { token, login, logout }
})