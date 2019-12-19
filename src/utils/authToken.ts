const key = "vakantieverhuur-looplijsten-token"
const regExp = /^[0-9a-f]{40}$/

export default {
  get: () : OptionalAuthToken => {
    try {
      return localStorage.getItem(key) || undefined
    } catch (err) {
      console.error(err)
      return undefined
    }
  },
  set: (token: AuthToken) : boolean => {
    if (regExp.test(token) === false) return false
    try {
      localStorage.setItem(key, token)
      return true
    } catch (err) {
      console.error(err)
      return false
    }
  },
  clear: () : boolean => {
    try {
      localStorage.removeItem(key)
      return true
    } catch (err) {
      console.error(err)
      return false
    }
  }
}
