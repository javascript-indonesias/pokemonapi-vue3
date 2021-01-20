import { createRouter, createWebHashHistory } from 'vue-router';

// route level code-splitting
// this generates a separate chunk (about.[hash].js) for this route
// which is lazy-loaded when the route is visited.
const aboutComponent = () => import(/* webpackChunkName: "about" */ '../views/About.vue');
const homeComponent = () => import(/* webpackChunkName: "home" */ '../views/Home.vue');

const routes = [
  {
    path: '/',
    name: 'Home',
    component: homeComponent,
  },
  {
    path: '/about/:slug',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: aboutComponent,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
