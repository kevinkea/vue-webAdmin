import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '../pages/layout/Layout'

/**
 * hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
 *                                if not set alwaysShow, only more than one route under the children
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
 **/
export const constantRouterMap = [
  { path: '/login', component: () => import('@/pages/login/index'), hidden: true },
  { path: '/404', component: () => import('@/pages/404'), hidden: true },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: 'Dashboard',
    hidden: true,
    children: [{
      path: 'dashboard',
      component: () => import('@/pages/dashboard/index')
    }]
  },
  {
    path: '/sys',
    component: Layout,
    redirect: '/sys/corpManage',
    name: 'sys',
    meta: { title: '系统管理', icon: 'sys' },
    children: [
      {
        path: 'corpManage',
        name: 'corpManage',
        component: () => import('@/pages/sys/corpManage'),
        meta: { title: '门店管理', icon: 'corpManage' }
      },
      {
        path: 'userManage',
        name: 'userManage',
        component: () => import('@/pages/sys/userManage'),
        meta: { title: '用户管理', icon: 'userManage' }
      },
      {
        path: 'authManage',
        name: 'authManage',
        component: () => import('@/pages/sys/authManage'),
        meta: { title: '权限管理', icon: 'authManage' }
      }
    ]
  },
  {
    path: '/set',
    component: Layout,
    redirect: '/set/cardSet',
    name: 'set',
    meta: { title: '系统设置', icon: 'set' },
    children: [
      {
        path: 'cardSet',
        name: 'cardSet',
        component: () => import('@/pages/set/cardSet'),
        meta: { title: '卡设置', icon: 'cardSet' }
      },
      {
        path: 'goodsSet',
        name: 'goodsSet',
        component: () => import('@/pages/set/goodsSet'),
        meta: { title: '商品设置', icon: 'goodsSet' }
      },
      {
        path: 'lessonSet',
        name: 'lessonSet',
        component: () => import('@/pages/set/lessonSet'),
        meta: { title: '课程设置', icon: 'lessonSet' }
      },
      {
        path: 'mbrshipSet',
        name: 'mbrshipSet',
        component: () => import('@/pages/set/mbrshipSet'),
        meta: { title: '会籍设置', icon: 'mbrshipSet' }
      },
      {
        path: 'siteSet',
        name: 'siteSet',
        component: () => import('@/pages/set/siteSet'),
        meta: { title: '场馆设置', icon: 'siteSet' }
      },
      {
        path: 'siteBizSet',
        name: 'siteBizSet',
        component: () => import('@/pages/set/siteBizSet'),
        meta: { title: '场馆业务设置', icon: 'siteBizSet' }
      }
    ]
  },
  {
    path: '/vip',
    component: Layout,
    redirect: '/vip/cusManage',
    name: 'vip',
    meta: { title: '会籍管理', icon: 'vip' },
    children: [
      {
        path: 'cusManage',
        name: 'cusManage',
        component: () => import('@/pages/vip/cusManage'),
        meta: { title: '客户管理', icon: 'cusManage' }
      },
      {
        path: 'cusPool',
        name: 'cusPool',
        component: () => import('@/pages/vip/cusPool'),
        meta: { title: '客户资源池', icon: 'cusPool' }
      }
    ]
  },
  {
    path: '/pay',
    component: Layout,
    redirect: '/pay/mbrshipPay',
    name: 'pay',
    meta: { title: '前台管理', icon: 'pay' },
    children: [
      {
        path: 'mbrshipPay',
        name: 'mbrshipPay',
        component: () => import('@/pages/pay/mbrshipPay'),
        meta: { title: '会籍购买', icon: 'mbrshipPay' }
      }
    ]
  },
  {
    path: '/pt',
    component: Layout,
    redirect: '/pt/mbrVisit',
    name: 'pt',
    meta: { title: '私教前台管理', icon: 'pt' },
    children: [
      {
        path: 'mbrVisit',
        name: 'mbrVisit',
        component: () => import('@/pages/pt/mbrVisit'),
        meta: { title: '预约查询', icon: 'mbrVisit' }
      },
      {
        path: 'ptSignNoPay',
        name: 'ptSignNoPay',
        component: () => import('@/pages/pt/ptSignNoPay'),
        meta: { title: '签约未缴费', icon: 'ptSignNoPay' }
      },
      {
        path: 'ptSignPaid',
        name: 'ptSignPaid',
        component: () => import('@/pages/pt/ptSignPaid'),
        meta: { title: '签约已缴费', icon: 'ptSignPaid' }
      },
      {
        path: 'ptContract',
        name: 'ptContract',
        component: () => import('@/pages/pt/ptContract'),
        meta: { title: '合同打印', icon: 'ptContract' }
      },
      {
        path: 'lessonOrder',
        name: 'lessonOrder',
        component: () => import('@/pages/pt/lessonOrder'),
        meta: { title: '课程预约', icon: 'lessonOrder' }
      },
      {
        path: 'ptEnterManage',
        name: 'ptEnterManage',
        component: () => import('@/pages/pt/ptEnterManage'),
        meta: { title: '课程刷卡', icon: 'ptEnterManage' }
      }
    ]
  },
  {
    path: '/site',
    component: Layout,
    redirect: '/site/siteOpenPay',
    name: 'site',
    meta: { title: '场馆管理', icon: 'site' },
    children: [
      {
        path: 'siteOpenPay',
        name: 'siteOpenPay',
        component: () => import('@/pages/site/siteOpenPay'),
        meta: { title: '场馆开场', icon: 'siteOpenPay' }
      },
      {
        path: 'siteOpenList',
        name: 'siteOpenList',
        component: () => import('@/pages/site/siteOpenList'),
        meta: { title: '开场列表', icon: 'siteOpenList' }
      },
      {
        path: 'siteOpenStatus',
        name: 'siteOpenStatus',
        component: () => import('@/pages/site/siteOpenStatus'),
        meta: { title: '开场状态', icon: 'siteOpenStatus' }
      }
    ]
  },
  {
    path: '/ct',
    component: Layout,
    redirect: '/ct/classSchedule',
    name: 'ct',
    meta: { title: '团操管理', icon: 'ct' },
    children: [
      {
        path: 'classSchedule',
        name: 'classSchedule',
        component: () => import('@/pages/ct/classSchedule'),
        meta: { title: '团课发布', icon: 'classSchedule' }
      }
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
