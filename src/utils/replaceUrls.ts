// @LINK: https://stackoverflow.com/questions/3809401/what-is-a-good-regular-expression-to-match-a-url
// eslint-disable-next-line no-useless-escape
const regExp = /((https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*))/g
const replaceWith = "<a href='$1'>$1</a>"
const replaceUrls = (text: string) => text.replace(regExp, replaceWith)
export default replaceUrls
