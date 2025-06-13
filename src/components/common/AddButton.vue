<script setup>
// import { computed } from 'vue'
// import { useRouter } from 'vue-router'
// import { useUserStore } from '@/store/userStore'
import AddPage from '@/view/AddPage.vue'

// const router = useRouter()
// const userStore = useUserStore()
// const userName = computed(() => (userStore.isLoggedIn && userStore.user ? userStore.user.id : null))
</script>

<template>
  <div class="add-button">
    <button @click="AddPage">+</button>
  </div>
</template>

<style scoped>
.add-button {
  bottom: 2rem;
  right: 2rem;
  z-index: 1000;
  position: fixed;
}

button {
  width: 60px;
  height: 60px;
  font-size: 1.5rem;
  font-weight: bold;
  padding: 0;
  border-radius: 50%;
  background-color: var(--gray);
  border: none;
  cursor: pointer;
}
</style>
