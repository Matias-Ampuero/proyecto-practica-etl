<template>
  <v-app>
    <v-navigation-drawer
      v-if="auth.isAuthenticated"
      v-model="drawer"
      app
      elevation="2"
    >
      <v-list-item
        prepend-avatar="https://randomuser.me/api/portraits/men/1.jpg"
        :title="auth.userEmail"
        subtitle="Administrador"
        class="pa-4"
      ></v-list-item>

      <v-divider></v-divider>

      <v-list density="compact" nav>
        <v-list-item
          prepend-icon="mdi-database"
          title="Registros Financieros"
          value="records"
          to="/records"
        ></v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar v-if="auth.isAuthenticated" color="primary" flat>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-app-bar-title class="font-weight-bold">ETL Dashboard</v-app-bar-title>
      <v-spacer></v-spacer>
      <v-btn variant="text" @click="auth.logout" prepend-icon="mdi-logout">
        Cerrar Sesión
      </v-btn>
    </v-app-bar>

    <v-main class="bg-grey-lighten-3">
      <router-view />
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from './stores/auth'

const auth = useAuthStore()
const drawer = ref(true)
</script>