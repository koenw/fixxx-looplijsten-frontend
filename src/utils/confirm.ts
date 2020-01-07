const confirm = (message: string, func: () => void) => {
  const confirmed = window.confirm(message)
  const result = confirmed ? func() : undefined
  return { confirmed, result }
}
export default confirm
