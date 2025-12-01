import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import LoginPage from '../views/LoginPage.vue';
import RegisterUser from '../views/RegisterUser.vue';
import AddExpense from '../views/AddExpense.vue';
import Summary from '../views/SummaryView.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'login',
    component: LoginPage
  },
  {
    path: '/registro',
    name: 'registro',
    component: RegisterUser
  },
  {
    path: '/agregar-gasto',
    name: 'agregar-gasto',
    component: AddExpense
  },
  {
    path: '/resumen',
    name: 'resumen',
    component: Summary
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
