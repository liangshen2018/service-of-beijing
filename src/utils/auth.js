import Cookie from 'js-cookie'

const TOKEN_KEY = 'token'
export function getToken () {
  return Cookie.get(TOKEN_KEY)
}
export function setToken (token) {
  return Cookie.get(TOKEN_KEY, token)
}
export function removeToken () {
  return Cookie.get(TOKEN_KEY)
}
