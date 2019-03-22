const user = {
  state: {
    token: localStorage.getItem('token') || ''
  },
  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    }
  },
  actions: {
    Login ({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        //   login(userInfo.phone, userInfo.code)
        //   .then(response => {
        //     const data = response.data
        //     localStorage.setItem('token',data.token)
        //     commit('SET_TOKEN', data.token)
        //     resolve()
        //   })
        //   .catch(error => {
        //     reject(error)
        //   })
      })
    }
  }
}
export default user
