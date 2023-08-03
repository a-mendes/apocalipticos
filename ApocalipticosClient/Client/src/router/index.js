import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Pessoas from '../views/Pessoas.vue'
import Veiculos from '../views/Veiculos.vue'
import Construcoes from '../views/Construcoes.vue'
import Consumiveis from '../views/Consumiveis.vue'
import Roupas from '../views/Roupas.vue'
import Ferramentas from '../views/Ferramentas.vue'
import Login from '../views/Login.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [{
    path: '/', 
    name: 'Home',
    component: Home,
  },
  {path: '/pessoas',
    name: 'Pessoas',
    component: Pessoas,},
  {path: '/veiculos',
    name: 'Veiculos',
    component: Veiculos,},
  {path: '/construcoes',
    name: 'Construcoes',
    component: Construcoes,},
  {path: '/consumiveis',
    name: 'Consumiveis',
    component: Consumiveis,},
  {path: '/roupas',
    name: 'Roupas',
    component: Roupas,},
  {path: '/ferramentas',
    name: 'Ferramentas',
    component: Ferramentas,},
  {path: '/login',
    name: 'Login',
    component: Login,}
  ]
})


export default router
