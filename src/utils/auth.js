// import Cookie from 'js-cookie'

const TOKEN_KEY = 'token'
export function getToken () {
  return sessionStorage.getItem(TOKEN_KEY)
}
export function setToken (token) {
    return sessionStorage.setItem(TOKEN_KEY, token)
}
export function removeToken () {
    return sessionStorage.removeItem(TOKEN_KEY)
}
