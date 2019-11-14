type Token = string
type OptionalToken = Token | undefined

const key = "vakantieverhuur-looplijsten-token"
const regExp = /^[0-9a-f]{40}$/

export default {
  get: () : OptionalToken => {
    return localStorage.getItem(key) || undefined
  },
  set: (token: Token) => {
    if (regExp.test(token) === false) return
    localStorage.setItem(key, token)
  },
  clear: () => {
    localStorage.removeItem(key)
  }
}
