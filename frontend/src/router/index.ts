import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
//import HomePage from '../views/HomePage.vue';
import UsuariosList from '../views/UsuariosList.vue';
import UsuarioForm from '../views/UsuarioForm.vue';

const routes: Array<RouteRecordRaw> = [
  { path: '/', redirect: '/usuarios' },
  { path: '/usuarios', component: UsuariosList },
  { path: '/usuarios/nuevo', component: UsuarioForm },
  { path: '/usuarios/editar/:id', component: UsuarioForm }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
