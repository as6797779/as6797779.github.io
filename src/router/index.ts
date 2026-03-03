import { createRouter, createWebHashHistory } from 'vue-router' // 改用 createWebHashHistory
// 若坚持用 history 模式，需额外配置 404 页面（下文补充）
// import { createRouter, createWebHistory } from 'vue-router'


const router = createRouter({
    history: createWebHashHistory(import.meta.env.BASE_URL), 
  // history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // 根路径重定向到教育广场首页
    {
      path: '/',
      redirect: '/education/home'
    },
    // 教育广场（父路由，包含子路由）
    {
      path: '/education',
      name: 'education',
      component: () => import('../views/Education/index.vue'),
      // 子路由
      children: [
        {
          path: 'home', // 完整路径：/education/home
          name: 'educationHome',
          component: () => import('../views/Education/Home.vue')
        },
        {
          path: 'course', // 完整路径：/education/course
          name: 'educationCourse',
          component: () => import('../views/Education/Course.vue')
        },
        {
          path: 'live', // 完整路径：/education/live
          name: 'educationLive',
          component: () => import('../views/Education/Live.vue')
        }
      ]
    },
    // 写作广场（父路由，包含子路由）
    {
      path: '/writing',
      name: 'writing',
      component: () => import('../views/Writing/index.vue'),
      // 子路由
      children: [
        {
          path: 'home', // 完整路径：/writing/home
          name: 'writingHome',
          component: () => import('../views/Writing/Home.vue')
        },
        {
          path: 'essay', // 完整路径：/writing/essay
          name: 'writingEssay',
          component: () => import('../views/Writing/Essay.vue')
        },
        {
          path: 'poem', // 完整路径：/writing/poem
          name: 'writingPoem',
          component: () => import('../views/Writing/Poem.vue')
        },// 原有代码中，在 writing 的 children 里新增：
        {
          path: 'novel', // 完整路径：/writing/novel
          name: 'writingNovel',
          component: () => import('../views/Writing/Novel.vue')
        }
      ]
    }
  ]
})

export default router