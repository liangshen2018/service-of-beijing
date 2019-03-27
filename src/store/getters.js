const getters = {
  openid: state => state.user.openid,
  appid: state => state.user.appid,
  bound: state => state.user.bound,
  userInfo: state => state.user.userInfo,
  familyList: state => state.user.familyList,
  equityId: state => state.user.equityId,
  orderId: state => state.user.orderId,
  orderList: state => state.user.orderList
}
export default getters
