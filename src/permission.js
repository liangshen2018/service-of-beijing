import router from './router'
import store from './store'
// 公从号菜单页
const menuList = ['user', 'home', 'servicePack']
router.beforeEach((to, from, next) => {
  if (!sessionStorage.getItem('token')) {
    store.dispatch('accredit').then(() => {
      if (menuList.includes(to.name)) {
        store.commit('SET_OPENID', to.params.openid)
        store.commit('SET_APPID', to.params.appid)
      }
      next()
    })
  } else {
    if (menuList.includes(to.name)) {
      store.commit('SET_OPENID', to.params.openid)
      store.commit('SET_APPID', to.params.appid)
    }
    next()
  }
  if (to.meta.title) {
    document.title = to.meta.title
  }
})
