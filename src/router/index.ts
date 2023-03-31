import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import NProgress from "@/config/nprogress";

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
    }
  ]
})

/**
 * @description 路由拦截 beforeEach
 * */
router.beforeEach(async (to, from, next) => {
  // 1.NProgress 开始
  NProgress.start();

  // 2.动态设置标题
  const title = import.meta.env.VITE_GLOB_APP_TITLE;
  document.title = to.meta.title ? `${to.meta.title} - ${title}` : title;

  next();
});


/**
 * @description 路由跳转结束
 * */
router.afterEach(() => {
  NProgress.done();
});

/**
 * @description 路由跳转错误
 * */
router.onError(error => {
  NProgress.done();
  console.warn("路由错误", error.message);
});


export default router
