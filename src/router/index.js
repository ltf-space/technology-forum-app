import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '../layout/Index'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
    //公共布局下的路由
    {
        path: '/',
        component: Layout,
        children: [
            {
                path: '',
                redirect: 'home'
            },
            {
                path: 'home',
                component: Home
            },
            {
                path: 'video',
                component: () => import('../views/Video')
            },
            {
                path: 'me',
                component: () => import('../views/Me')
            },
        ]
    },
    // 文章详情
    {
        path: '/article/details/:id',
        name: 'ArticleDetails',
        component: () => import('../views/ArticleDetails')
    },
    // 发表文章及视频页
    {
        path: '/upload',
        name: 'Upload',
        component: () => import('../views/Upload')
    },
    // 搜索页
    {
        path: '/search',
        name: 'Search',
        component: () => import('../views/Search')
    },
    // 登录
    {
        path: '/login',
        name: 'Login',
        component: () => import('../views/Login')
    },
    // 用户文章列表页
    {
        path: '/userArticle',
        name: 'UserArticle',
        component: () => import('../views/UserArticle')
    },
    // 用户视频页
    {
        path: '/userVideo',
        name: 'UserVideo',
        component: () => import('../views/UserVideo')
    },
    // 用户个人主页
    {
      path:'/user/:uid',
      // name:UserPage,
      component: () => import('../views/UserPage')
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

//路由卫士
// router.beforeEach((to, from, next) => {
//     if (to.name !== 'Login' && !localStorage.getItem("uid")) next({name: 'Login'})
//     else next()
// })

export default router
