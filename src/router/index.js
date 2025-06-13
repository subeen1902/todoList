import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/view/HomePage.vue'
import AddPage from '@/view/AddPage.vue'
import TodoPage from '@/view/TodoPage.vue'
import HabitTrackerPage from '@/view/HabitTrackerPage.vue'
import MyPage from '@/view/MyPage.vue'
import LoginPage from '@/view/LoginPage.vue'
import JoinPage from '@/view/JoinPage.vue'
import { useUserStore } from '@/store/userStore'
import HabitStatsPage from '@/view/HabitStatsPage.vue'
import TodoStatsPage from '@/view/TodoStatsPage.vue'
import TotalStatsPage from '@/view/TotalStatsPage.vue'

const routes = [
  {
    path: '/',
    redirect: '/login',
  },
  {
    path: '/home',
    name: 'HomePage',
    component: HomePage,
    meta: { requiresAuth: true },
  },
  {
    path: '/todo',
    name: 'TodoPage',
    component: TodoPage,
    meta: { requiresAuth: true },
  },
  {
    path: '/add',
    name: 'AddPage',
    component: AddPage,
    meta: { requiresAuth: true },
  },
  {
    path: '/habit-tracker',
    name: 'HabitTrackerPage',
    component: HabitTrackerPage,
    meta: { requiresAuth: true },
  },
  {
    path: '/stats',
    name: 'TotalStats',
    component: TotalStatsPage,
    meta: { requiresAuth: true },
  },
  {
    path: '/stats/habit',
    name: 'HabitStats',
    component: HabitStatsPage,
    meta: { requiresAuth: true },
  },
  {
    path: '/stats/todo',
    name: 'TodoStats',
    component: TodoStatsPage,
    meta: { requiresAuth: true },
  },
  {
    path: '/my',
    name: 'MyPage',
    component: MyPage,
    meta: { requiresAuth: true },
  },
  {
    path: '/login',
    name: 'LoginPage',
    component: LoginPage,
    meta: { requiresAuth: false },
  },
  {
    path: '/join',
    name: 'JoinPage',
    component: JoinPage,
    meta: { requiresAuth: false },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  const userStore = useUserStore()
  const isLoggedIn = userStore.isLoggedIn

  if (to.meta.requiresAuth && !isLoggedIn) {
    next({ name: 'LoginPage' })
  } else if (
    !to.meta.requiresAuth &&
    isLoggedIn &&
    (to.name === 'LoginPage' || to.name === 'JoinPage')
  ) {
    next({ name: 'HomePage' })
  } else {
    next()
  }
})

export default router
