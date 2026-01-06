<template>
    <v-container>
      <v-card class="elevation-2 mt-5">
        <v-card-title class="d-flex align-center pa-4">
          <v-icon icon="mdi-table" class="me-3" color="primary"></v-icon>
          <span class="text-h5 font-weight-bold">Registros Financieros (ETL)</span>
          <v-spacer></v-spacer>
          <v-btn color="primary" class="me-2" prepend-icon="mdi-plus" @click="openCreateDialog">
            Nuevo
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
  
          <template v-slot:item.actions="{ item }">
            <v-icon size="small" class="me-2" color="blue" @click="editItem(item)">
              mdi-pencil
            </v-icon>
            <v-icon size="small" color="error" @click="deleteItem(item)">
              mdi-delete
            </v-icon>
          </template>
        </v-data-table>
      </v-card>
  
      <v-dialog v-model="dialog" max-width="500px">
        <v-card>
          <v-card-title class="text-h5">{{ formTitle }}</v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12" sm="6">
                  <v-text-field v-model="editedItem.date" label="Fecha (YYYY-MM-DD)"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field v-model="editedItem.category" label="Categoría"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field v-model="editedItem.amount" label="Monto" type="number"></v-text-field>
                </v-col>
                <v-col cols="12" sm="12">
                  <v-text-field v-model="editedItem.description" label="Descripción"></v-text-field>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue-darken-1" variant="text" @click="close">Cancelar</v-btn>
            <v-btn color="blue-darken-1" variant="text" @click="save">Guardar</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-container>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted, computed } from 'vue'
  import { useAuthStore } from '../stores/auth'
  import api from '../services/api'
  
  interface FinancialRecord {
    id: number | null;
    date: string;
    category: string;
    description: string;
    amount: number;
  }
  
  const auth = useAuthStore()
  const records = ref<FinancialRecord[]>([])
  const loading = ref(true)
  const dialog = ref(false)
  const editedIndex = ref(-1)
  
  const defaultItem: FinancialRecord = {
    id: null,
    date: '', 
    category: '',
    description: '',
    amount: 0
  }
  
  const editedItem = ref<FinancialRecord>({ ...defaultItem })
  
  const formTitle = computed(() => {
    return editedIndex.value === -1 ? 'Nuevo Registro' : 'Editar Registro'
  })
  
  const headers: any = [
    { title: 'Fecha', key: 'date', align: 'start' },
    { title: 'Categoría', key: 'category', align: 'start' },
    { title: 'Descripción', key: 'description', align: 'start' },
    { title: 'Monto', key: 'amount', align: 'end' },
    { title: 'Acciones', key: 'actions', sortable: false, align: 'center' },
  ]
  
  const loadRecords = async () => {
    loading.value = true
    try {
      const response = await api.get('/records')
      records.value = response.data
    } catch (error) {
      console.error(error)
    } finally {
      loading.value = false
    }
  }
  
  onMounted(loadRecords)
  
  const openCreateDialog = () => {
    editedIndex.value = -1
    editedItem.value = { ...defaultItem }
    editedItem.value.date = (new Date().toISOString().split('T')[0]) as string
    dialog.value = true
  }
  
  const editItem = (item: FinancialRecord) => {
    editedIndex.value = records.value.indexOf(item)
    editedItem.value = { ...item }
    dialog.value = true
  }
  
  const deleteItem = async (item: FinancialRecord) => {
    if (confirm('¿Estás seguro de eliminar este registro?')) {
      try {
        await api.delete(`/records/${item.id}`)
        await loadRecords()
      } catch (error) {
        console.error(error)
      }
    }
  }
  
  const close = () => {
    dialog.value = false
    editedItem.value = { ...defaultItem }
    editedIndex.value = -1
  }
  
  const save = async () => {
    try {
      if (editedIndex.value > -1) {
        await api.patch(`/records/${editedItem.value.id}`, editedItem.value)
      } else {
        await api.post('/records', editedItem.value)
      }
      await loadRecords()
      close()
    } catch (error) {
      console.error(error)
    }
  }
  </script>