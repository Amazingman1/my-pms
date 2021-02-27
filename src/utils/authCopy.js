
export function getStorage(name) {
  return localStorage.getItem(name)
}

export function setStorage(name, token) {
  return localStorage.setItem(name, token)
}

export function removeStorage(name) {
  return localStorage.removeItem(name)
}

