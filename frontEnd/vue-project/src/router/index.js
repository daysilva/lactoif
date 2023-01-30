import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import RegistrarProducaoPage from '../views/RegistrarProducaoPage.vue'
import RegistroDeProducaoPage from "../views/RegistroDeProducaoPage.vue"
import HistoricoPage from '../views/HistoricoPage.vue'
import EstoquePage from '../views/EstoquePage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/registrar_producao',
      name: 'registrar_producao_page',
      component: RegistrarProducaoPage
    },
    {
      path: '/registro_de_producao',
      name: 'registro_de_producao_page',
      component: RegistroDeProducaoPage
    },
    {
      path: '/historico',
      name: 'historico_page',
      component: HistoricoPage
    },
    {
      path: '/estoque',
      name: 'estoque_page',
      component: EstoquePage
    }
  ]
})

export default router
