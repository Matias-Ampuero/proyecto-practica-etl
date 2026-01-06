import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import router from '../router'

export const useAuthStore = defineStore('auth', () => {
  const token = ref(localStorage.getItem('token') || '')
  const userEmail = ref(localStorage.getItem('userEmail') || '')

  const isAuthenticated = computed(() => !!token.value)

  async function login(email: string, pass: string) {
    if (email === 'matias@test.com' && pass === '123456') {
      token.value = 'fake-jwt-token'
      userEmail.value = email
      localStorage.setItem('token', token.value)
      localStorage.setItem('userEmail', email)
      router.push('/records')
    } else {
      throw new Error('Credenciales incorrectas')
    }
  }

  function logout() {
    token.value = ''
    userEmail.value = ''
    localStorage.removeItem('token')
    localStorage.removeItem('userEmail')
    router.push('/login')
  }

  return { token, userEmail, isAuthenticated, login, logout }
})