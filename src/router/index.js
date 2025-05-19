import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import WelcomeView from '../views/WelcomeView.vue'
import SearchView from '../views/SearchView.vue'

const routes = [
    {
    path: '/',
    name: 'welcome',
    component: WelcomeView
  },
  {
    path: '/home',
    name: 'home',
    component: HomeView
  },
    {
    path: '/search:word',
    name: 'search',
    component: SearchView
  },
  {
    path: '/notFound',
    name: 'notFound',
    component: () => import('../views/NotFound.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
