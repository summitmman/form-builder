import { createRouter, createWebHistory } from 'vue-router';

const routes = [
    {
        path: '/',
        component: () => import('../views/Demo.vue')
    },
    {
        path: '/test',
        component: () => import('../views/Test.vue')
    },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})