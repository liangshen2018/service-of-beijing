import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      meta: {
        title: '登陆/注册'
      },
      component: () => import('@/view/login/index')
    },
    {
      path: '/servicePack/:openid',
      name: 'servicePack',
      meta: {
        title: '服务包列表'
      },
      component: () => import('@/view/servicePack/index')
    },
    {
      path: '/servicePackDetail/:id',
      name: 'servicePackDetail',
      meta: {
        title: '服务卡详情页'
      },
      component: () => import('@/view/servicePack/detail')
    },

    {
      path: '/babyAdd',
      name: 'babyAdd',
      meta: {
        title: '添加宝贝'
      },
      component: () => import('@/view/babyAdd/index')
    },
    {
      path: '/baby/detail',
      name: 'babyDetail',
      meta: {
        title: '宝贝详情'
      },
      component: () => import('@/view/babyAdd/detail')
    },
    {
      path: '/user/:openid',
      name: 'user',
      meta: {
        title: '个人中心'
      },
      component: () => import('@/view/user/index')
    },
    {
      path: '/userEdit',
      name: 'userEdit',
      meta: {
        title: '个人中心'
      },
      component: () => import('@/view/user/userEdit')
    },
    {
      path: '/myServicePack',
      name: 'myServicePack',
      meta: {
        title: '我的服务包'
      },
      component: () => import('@/view/myServicePack/index')
    },
    {
      path: '/packageInterest/:id',
      name: 'packageInterest',
      meta: {
        title: '服务包权益'
      },
      component: () => import('@/view/myServicePack/packageInterest')
    },
    {
      path: '/doctorTeam',
      name: 'doctorTeam',
      meta: {
        title: '签约医生团队'
      },
      component: () => import('@/view/doctorTeam/index')
    },
    {
      path: '/contractFamilyphysic/:id',
      name: 'contractFamilyphysic',
      meta: {
        title: '签约家庭医生'
      },
      component: () => import('@/view/doctorTeam/contractFamilyphysic')
    },
    {
      path: '/consultDr',
      name: 'consultDr',
      meta: {
        title: '联系医生'
      },
      component: () => import('@/view/doctorTeam/consultDr')
    },
    {
      path: '/payment/:id',
      name: 'payment',
      meta: {
        title: '订单支付'
      },
      component: () => import('@/view/payment/index')
    },
    {
      path: '/success',
      name: 'success',
      meta: {
        title: '支付成功'
      },
      component: () => import('@/view/payment/success')
    },
    {
      path: '/assessment',
      name: 'assessment',
      meta: {
        title: '填写评估表'
      },
      component: () => import('@/view/assessment/index')
    }
  ]
})

export default router
