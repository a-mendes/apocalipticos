import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Pessoas from '../views/Pessoas.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [{
    path: '/', 
    name: 'Home',
    component: Home,
  },
  {path: '/pessoas',
    name: 'Pessoas',
    component: Pessoas,}
  ]
})


export default router
