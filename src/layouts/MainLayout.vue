<template>
  <div class="app-main-layout">

    <Navbar @click="isOpen = !isOpen"/>

    <Sidebar v-model="isOpen" />

    <main class="app-content" :class="{full: !isOpen}">
      <div class="app-page">
        <router-view></router-view>
      </div>
    </main>
    <div class="fixed-action-btn">
      <router-link class="btn-floating btn-large yellow" to="/record">
        <i class="large material-icons black-text">add</i>
      </router-link>
    </div>
  </div>
</template>
<script>
import Navbar from '../components/app/Navbar'
import Sidebar from '../components/app/Sidebar'

export default {
  name: 'MainLayout',
  data: () => ({
    isOpen: true
  }),
  components: {
    Navbar,
    Sidebar
  }
}
</script>
