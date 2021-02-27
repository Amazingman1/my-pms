'use strict'
const NODE_ENV_Key = {
  'development': 'SHYM_DEV_',
  'production': 'SHYM_PRO_',
  'stage': 'SHYM_STA_',
  'release': 'SHYM_REL_'
}
const g_localStorage = {
  getItem(key) {
    return localStorage.getItem(NODE_ENV_Key[process.env.VUE_APP_ENV] + key)
  },
  setItem(key, value) {
    return localStorage.setItem(NODE_ENV_Key[process.env.VUE_APP_ENV] + key, value)
  },
  removeItem(key) {
    return localStorage.removeItem(NODE_ENV_Key[process.env.VUE_APP_ENV] + key)
  }
}
export default g_localStorage
