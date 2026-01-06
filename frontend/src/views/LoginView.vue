<template>
    <v-container class="fill-height" fluid>
      <v-row align="center" justify="center">
        <v-col cols="12" sm="8" md="4">
          <v-card class="elevation-12 rounded-lg">
            <v-toolbar color="primary" dark flat>
              <v-toolbar-title class="text-center font-weight-bold">
                Iniciar Sesión
              </v-toolbar-title>
            </v-toolbar>
            
            <v-card-text class="pa-6">
              <v-form @submit.prevent="handleLogin" ref="form">
                <v-text-field
                  v-model="email"
                  label="Correo Electrónico"
                  prepend-icon="mdi-account"
                  type="email"
                  variant="outlined"
                  :rules="[v => !!v || 'El correo es requerido']"
                  required
                ></v-text-field>
  
                <v-text-field
                  v-model="password"
                  label="Contraseña"
                  prepend-icon="mdi-lock"
                  type="password"
                  variant="outlined"
                  class="mt-2"
                  :rules="[v => !!v || 'La contraseña es requerida']"
                  required
                ></v-text-field>
  
                <v-alert
                  v-if="errorMessage"
                  type="error"
                  variant="tonal"
                  class="mt-3 mb-3"
                  closable
                >
                  {{ errorMessage }}
                </v-alert>
  
                <v-btn
                  type="submit"
                  color="primary"
                  block
                  size="large"
                  class="mt-4 font-weight-bold"
                  :loading="loading"
                >
                  Ingresar
                </v-btn>
              </v-form>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue'
  import { useAuthStore } from '../stores/auth'
  
  const authStore = useAuthStore()
  
  const email = ref('')
  const password = ref('')
  const loading = ref(false)
  const errorMessage = ref('')
  
  const handleLogin = async () => {
    if (!email.value || !password.value) return
  
    loading.value = true
    errorMessage.value = ''
  
    try {
      await authStore.login(email.value, password.value)
    } catch (error: any) {
      console.error(error)
      errorMessage.value = 'Credenciales inválidas. Intente nuevamente.'
    } finally {
      loading.value = false
    }
  }
  </script>