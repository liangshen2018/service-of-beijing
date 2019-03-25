import { getToken, getUserInfo } from '@/api/user'
const user = {
  state: {
    appid: sessionStorage.getItem('appid') || null,
    openid: sessionStorage.getItem('openid') || null,
    bound: sessionStorage.getItem('bound') || null,
    userInfo: JSON.parse(sessionStorage.getItem('userInfo')) || null
  },
  mutations: {
    //   openid
    SET_OPENID: (state, openid) => {
      sessionStorage.setItem('openid', openid)
      state.openid = openid
    },
    SET_APPID: (state, appid) => {
      sessionStorage.setItem('appid', appid)
      state.appid = appid
    },
    //   是否绑定手机 1 绑定了
    SET_BOUND: (state, bound) => {
      sessionStorage.setItem('bound', bound)
      state.bound = bound
    },
    //   是否绑定手机 1 绑定了
    SET_USER_INFO: (state, userInfo) => {
      sessionStorage.setItem('userInfo', JSON.stringify(userInfo))
      state.userInfo = userInfo
    }
  },
  actions: {
    // 授权
    accredit ({ commit }) {
      return new Promise((resolve, reject) => {
        getToken()
          .then(response => {
            const token = response.token_type + ' ' + response.access_token
            sessionStorage.setItem('token', token)
            resolve()
          })
          .catch(error => {
            reject(error)
          })
      })
    },

    setUserInfo ({ commit }, openid) {
      return new Promise((resolve, reject) => {
        getUserInfo(openid)
          .then(res => {
            commit('SET_USER_INFO', res.ITEMS)
            resolve(res.ITEMS)
          })
          .catch(error => {
            reject(error)
          })
      })
    }
  }
}
export default user
