const currentTime = () => {
  const date = new Date()
  const twoDigits = (n: number) => `0${ n }`.slice(-2)
  const time = `${ twoDigits(date.getHours()) }.${ twoDigits(date.getMinutes()) }`
  return time
}
export default currentTime
