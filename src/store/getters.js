const getters = {
  openid: state => state.user.openid,
  appid: state => state.user.appid,
    bound: state => state.user.bound,
  userInfo: state => state.user.userInfo,
}
export default getters
