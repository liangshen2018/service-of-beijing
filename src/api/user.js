import { fetch, post } from './http'

// 获取验证码data
export function getCode (phone) {
  return fetch(`/upms/wx/user/code/${phone}`)
}
// 授权获取token
export function getToken () {
  return post(
    `/auth/oauth/token?grant_type=client_credentials&client_id=wechat-user&client_secret=health-wechat-user&scope=server`
  )
}
// 绑定手机
export function userBind (data) {
  return post(`/upms/wx/user/bind`, data)
}
// 检查用户是否绑定手机号
export function checkUser (openid, appid) {
  return fetch(`/upms/wx/user/check/${openid}/${appid}`)
}

// 获取健康自评题
export function getAssessmentList(pageNo, pageSize, sex) {
    return fetch(`/upms/wx/Questionnaire/page/${ pageNo }/${ pageSize }/${ sex }`)
}
// 提交健康自评题
export function submitAssessment (data) {
  return post(`/upms/wx/package/health`, data)
}
// 获取用户信息
export function getUserInfo (openid) {
  return fetch(`/upms/wx/user/${openid}`)
}

// 用户更改昵称
export function userNameEdit (data) {
  return post(`/upms/wx/user`, data)
}

// 用户家庭成员编辑/新增
export function userFamilyEdit (data) {
  return post(`/upms/wx/user/family`, data)
}
// 用户家庭成员列表
export function getFamilyList (openid) {
  return fetch(`/upms/wx/user/family/list/${openid}`)
}

// 购买服务包
export function paymentPushOrder (data) {
  return post(`/upms/wx/payment/pushOrder`, data)
}
// 更换家庭医生
export function teamSign (data) {
  return post(`/upms/wx/team/signing`, data)
}
// 签约家庭医生
export function teamChange(data) {
    return post(`/upms/wx/team/change`, data)
}
// 获取服务包订单表
export function getOrderList (openid) {
  return fetch(`/upms/wx/order/list/${openid}`)
}

// 获取服务包详情
export function getOrderInfoById (orderId, userId) {
  return fetch(`/upms/wx/order/${orderId}/${userId}`)
}

// 获取医生团队信息
export function getTeamInfo(teamId) {
    return fetch(`/upms/wx/team/${teamId}`)
}

