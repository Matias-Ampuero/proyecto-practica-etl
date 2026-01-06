<template>
    <v-container>
      <v-card class="elevation-2 mt-5">
        <v-card-title class="d-flex align-center pa-4">
          <v-icon icon="mdi-table" class="me-3" color="primary"></v-icon>
          <span class="text-h5 font-weight-bold">Registros Financieros (ETL)</span>
          <v-spacer></v-spacer>
          <v-btn color="error" variant="flat" @click="auth.logout" prepend-icon="mdi-logout">
            Salir
          </v-btn>
        </v-card-title>
  
        <v-data-table
          :headers="headers"
          :items="records"
          :loading="loading"
          hover
          no-data-text="No hay datos en la base de datos"
        >
          <template v-slot:item.amount="{ item }">
            <v-chip :color="Number(item.amount) > 0 ? 'success' : 'error'" size="small">
              $ {{ Number(item.amount).toLocaleString() }}
            </v-chip>
          </template>
        </v-data-table>
      </v-card>
    </v-container>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted } from 'vue'
  import { useAuthStore } from '../stores/auth'
  import api from '../services/api'
  
  interface FinancialRecord {
    id: number;
    date: string;
    category: string;
    description: string;
    amount: number;
  }
  
  const auth = useAuthStore()
  const records = ref<FinancialRecord[]>([])
  const loading = ref(true)
  
  const headers: any = [
    { title: 'Fecha', key: 'date', align: 'start' },
    { title: 'Categoría', key: 'category', align: 'start' },
    { title: 'Descripción', key: 'description', align: 'start' },
    { title: 'Monto', key: 'amount', align: 'end' },
  ]
  
  onMounted(async () => {
    try {
      const response = await api.get('/records')
      records.value = response.data
    } catch (error) {
      console.error(error)
    } finally {
      loading.value = false
    }
  })
  </script>