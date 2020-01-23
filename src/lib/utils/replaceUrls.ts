// @LINK: https://stackoverflow.com/questions/3809401/what-is-a-good-regular-expression-to-match-a-url
// eslint-disable-next-line no-useless-escape
const regExp = /((https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-zA-Z0-9()]{2,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*))/g
const replaceWith = (g0: string, _: string, g2: string | undefined) => {
  const text = g0
  const url = `${ g2 === undefined ? "http://" : "" }${ text }`
  return `<a href="${ url }" target="_blank">${ text }</a>`
}
const replaceUrls = (text: string) => text.replace(regExp, replaceWith)
export default replaceUrls
