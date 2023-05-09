import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: { name: 'main' },
  },
  {
    path: '/:pathMatch(.*)*/',
    name: 'NotFound',
    component: () => import('@/components/common/AppNotFound.vue'),
  },
  {
    path: '/',
    component: () => import('@/components/layout/AppLayout.vue'),
    children: [
      {
        path: '/main',
        name: 'main',
        component: () => import('@/views/MainView.vue'),
      },
      {
        path: '/todo-list/:id',
        name: 'todo-list',
        component: () => import('@/views/TodoListView.vue'),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
