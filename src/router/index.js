import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import(/*webpackChunkName: "HomePage"*/ '@/views/HomeView.vue') //Lazy Loading Jesus 
      // component: () => import(/*webpackChunkName: "HomePage"*/ '@/components/Process.vue') //Lazy Loading Jesus 

    }
  ]
})

export default router
