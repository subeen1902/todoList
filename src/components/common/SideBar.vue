<script setup>
import { useRouter, useRoute } from 'vue-router'

// import { useUserStore } from '../../store/userStore'
// import { computed } from 'vue'

const router = useRouter()
const route = useRoute()
// const userStore = useUserStore()
// const userName = computed(() => (userStore.isLoggedIn && userStore.user ? userStore.user.id : null))

const isActive = (targetRoute) => {
  return route.path === targetRoute
}

const goTo = (path) => router.push(path)
</script>

<template>
  <aside class="sidebar">
    <!-- 홈 버튼 -->
    <div class="home">
      <div class="icon" :class="{ active: isActive('/home') }" @click="goTo('/home')">
        <i class="fa-solid fa-house"></i>
      </div>
    </div>

    <!-- 투두 목록 버튼 -->
    <div class="todo-items">
      <div class="icon" :class="{ active: isActive('/todo') }" @click="goTo('/todo')">
        <i class="fa-solid fa-list-ul"></i>
      </div>
    </div>

    <!-- 캘린더 버튼 -->
    <div class="calendar">
      <div
        class="icon"
        :class="{ active: isActive('/habit-tracker') }"
        @click="goTo('/habit-tracker')"
      >
        <i class="fa-solid fa-calendar"></i>
      </div>
    </div>

    <!-- 차트 버튼 -->
    <div class="stats">
      <div class="icon" :class="{ active: isActive('/stats') }" @click="goTo('/stats')">
        <i class="fa-solid fa-chart-simple"></i>
      </div>
    </div>

    <!-- 마이 페이지 -->
    <div class="mypage">
      <div class="icon" :class="{ active: isActive('/my') }" @click="goTo('/my')">
        <i class="fa-solid fa-user"></i>
      </div>
    </div>
  </aside>
</template>

<style scoped>
.sidebar {
  width: 60px;
  background-color: var(--lightgray);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-shadow: 1px 0 4px var(--border-color);
  height: 100vh;
  padding: 20px 0;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
}

.menu-items {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  margin-bottom: 100px;
}

.icon {
  font-size: 22px;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0.4;
  cursor: pointer;
  transition: all 0.3s ease;
}

.icon:hover {
  opacity: 0.7;
  border-radius: 10px;
  color: var(--darkgray);
}

.icon.active {
  opacity: 1;
  border-radius: 10px;
  padding: 8px;
  color: var(--darkgray);
}
</style>
