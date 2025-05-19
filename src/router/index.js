import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import WelcomeView from '../views/WelcomeView.vue'
import SearchView from '../views/SearchView.vue'
import PokemonsListView from '../views/PokemonsListView.vue'

const routes = [
  {
    path: '/',
    name: 'welcome',
    component: WelcomeView
  },
  {
    path: '/home',
    name: 'home',
    component: HomeView,
    children: [
      {
        path: '/home',
        name: 'pokemons',
        component: PokemonsListView
      },
      {
        path: '/search=:word',
        name: 'search',
        component: SearchView
      },

    ]
  },

  { path: '/404', component: () => import('../views/NotFound.vue') },
  {
    path: '/:catchAll(.*)', redirect: '404'
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
