import { getToken, getUserInfo, getFamilyList, getOrderList } from '@/api/user'
const user = {
  state: {
    appid: sessionStorage.getItem('appid') || null,
    openid: sessionStorage.getItem('openid') || null,
    bound: sessionStorage.getItem('bound') || null,
    equityId: sessionStorage.getItem('equityId') || null,
    orderId: sessionStorage.getItem('orderId') || null,
    userInfo: JSON.parse(sessionStorage.getItem('userInfo')) || null,
    familyList: JSON.parse(sessionStorage.getItem('familyList')) || null,
    orderList: JSON.parse(sessionStorage.getItem('orderList')) || null
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
    //  微信用户信息
    SET_USER_INFO: (state, userInfo) => {
      sessionStorage.setItem('userInfo', JSON.stringify(userInfo))
      state.userInfo = userInfo
    },
    //  家庭成员
    SET_FAMILY_LIST: (state, familyList) => {
      sessionStorage.setItem('familyList', JSON.stringify(familyList))
      state.familyList = familyList
    },
    //  服务包Id
    SET_EQUITY_ID: (state, equityId) => {
      sessionStorage.setItem('equityId', equityId)
      state.equityId = equityId
    },
    //  服务包订单Id
    SET_ORDER_ID: (state, orderId) => {
      sessionStorage.setItem('orderId', orderId)
      state.orderId = orderId
    },
    //  服务包列表
    SET_ORDER_LIST: (state, orderList) => {
      sessionStorage.setItem('orderList', JSON.stringify(orderList))
      state.orderList = orderList
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
    },
    setFamilyList ({ commit }, openid) {
      return new Promise((resolve, reject) => {
        getFamilyList(openid)
          .then(res => {
            commit('SET_FAMILY_LIST', res.ITEMS)
              resolve(res.ITEMS)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    setOrderList ({ commit }, openid) {
      return new Promise((resolve, reject) => {
        getOrderList(openid)
          .then(res => {
            commit('SET_ORDER_LIST', res.ITEMS)
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
