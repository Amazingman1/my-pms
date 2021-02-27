
// const TokenKey = 'authorization'

// export function getToken() {
//   return localStorage.getItem(TokenKey)
// }

// export function setToken(token) {
//   return localStorage.setItem(TokenKey, token)
// }

// export function removeToken() {
//   return localStorage.removeItem(TokenKey)
// }

import Cookies from 'js-cookie'

const TokenKey = 'authorization'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return process.env.NODE_ENV === 'development' ? Cookies.set(TokenKey, token) : Cookies.set(TokenKey, token, { domain: 'eloadspider.com' })
}

export function removeToken() {
  return process.env.NODE_ENV === 'development' ? Cookies.remove(TokenKey) : Cookies.remove(TokenKey, { domain: 'eloadspider.com' })
}
