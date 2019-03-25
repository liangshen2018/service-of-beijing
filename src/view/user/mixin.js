import { checkUser } from '@/api/user'
import store from '@/store'
export default {
  beforeRouteEnter (to, from, next) {
    const openid = sessionStorage.getItem('openid')
    const appid = sessionStorage.getItem('appid')
    const bound = sessionStorage.getItem('bound')
    if (bound != 1) {
      checkUser(openid,appid).then(res => {
        if (res.ITEMS.bound === 1) {
          store.commit('SET_BOUND', res.ITEMS.bound)
          next()
        } else {
          next(`/login?redirect=${to.path}`)
        }
      })
    } else {
      next()
    }
  }
}
