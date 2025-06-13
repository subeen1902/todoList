<script setup>
import { useRoute } from 'vue-router'
import { computed } from 'vue'
import SideBar from './components/common/SideBar.vue'
import './assets/styles/main.css'

const route = useRoute()
const showSidebar = computed(() => {
  return route.matched.some((r) => r.meta.requiresAuth)
})
</script>

<template>
  <div class="container" :class="{ 'auth-page': !showSidebar }">
    <SideBar v-if="showSidebar" />
    <RouterView />
  </div>
</template>

<style scoped>
.container {
  display: flex;
  width: 100vw;
  padding-left: 60px;
  box-sizing: border-box;
}

/* 로그인, 회원가입 페이지일 경우 중앙 정렬용 스타일 */
.auth-page {
  justify-content: center;
  align-items: center;
  height: 100vh;
}
@import './assets/styles/main.css';
</style>
