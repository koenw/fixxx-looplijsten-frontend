type Token = string
type OptionalToken = Token | undefined

const key = "vakantieverhuur-looplijsten-token"
const regExp = /^[0-9a-f]{40}$/

export default {
  get: () : OptionalToken => {
    try {
      return localStorage.getItem(key) || undefined
    } catch (err) {
      console.error(err)
      return undefined
    }
  },
  set: (token: Token) : boolean => {
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
