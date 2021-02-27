import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/home',
    children: [
      {
        path: 'home',
        name: 'home',
        component: () => import('@/views/home/index'),
        meta: { title: '首页', icon: 'dashboard' }
      },
      {
        path: 'houseStaus',
        name: 'houseStaus',
        component: () => import('@/views/houseStaus/index'),
        meta: { title: '房态', icon: 'dashboard' }
      },
      {
        path: 'allList',
        name: 'allList',
        component: () => import('@/views/allList/index'),
        meta: { title: '全部列表', icon: 'dashboard' }
      }, {
        path: 'nightTrial',
        name: 'nightTrial',
        component: () => import('@/views/nightTrial/index'),
        meta: { title: '夜审', icon: 'dashboard' }
      },
      {
        path: 'report',
        name: 'report',
        component: () => import('@/views/report/index'),
        meta: { title: '报表', icon: 'dashboard' }
      },
      {
        path: 'pursesteward',
        name: 'pursesteward',
        component: () => import('@/views/pursesteward/newAccounting/index'),
        meta: { title: '账务', icon: 'dashboard' }
      },
      {
        path: '/booking',
        name: 'booking',
        component: () => import('@/views/booking/index'),
        meta: { title: '预定', icon: 'dashboard' }
      },
      {
        path: '/checkin',
        name: 'checkin',
        component: () => import('@/views/checkin/index'),
        meta: { title: '入住', icon: 'dashboard' }
      },
      {
        path: 'handover',
        name: 'handover',
        component: () => import('@/views/handover/index'),
        meta: { title: '交接班', icon: 'dashboard' }
      },
      {
        path: 'guestsPms',
        name: 'guestsPms',
        component: () => import('@/views/guests/index'),
        meta: { title: '宾客', icon: 'dashboard' }
      },
      {
        path: 'storeManager',
        name: 'storeManager',
        component: () => import('@/views/storeManager/index'),
        meta: { title: '店长', icon: 'dashboard' }
      }, {
        path: 'workLog',
        name: 'workLog',
        component: () => import('@/views/workLog/index'),
        meta: { title: '员工日志', icon: 'dashboard' }
      },
      {
        path: 'teamPms',
        name: 'teamPms',
        component: () => import('@/views/team/index'),
        meta: { title: '团队', icon: 'dashboard' }
      },
      {
        path: 'roomSeting',
        name: 'roomSeting',
        component: () => import('@/views/roomSeting/index'),
        meta: { title: '房务', icon: 'dashboard' }
      },
      {
        path: 'pmsb',
        name: 'pmsb',
        component: () => import('@/views/pmsb/index'),
        meta: { title: 'pmsb', icon: 'dashboard' }
      },
      {
        path: 'cardList',
        name: 'cardList',
        component: () => import('@/views/cardList/index'),
        meta: { title: '写卡', icon: 'dashboard' }
      }]
  },
  // 404 page must be placed at the end !!! accountReceivale
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()
// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
