import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'
const xhbTokenKey = 'xhb-Admin-Token'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function getXhbToken() {
  return Cookies.get(xhbTokenKey)
}

export function setXhbToken(token) {
  return Cookies.set(xhbTokenKey, token)
}

export function removeXhbToken() {
  return Cookies.remove(xhbTokenKey)
}
