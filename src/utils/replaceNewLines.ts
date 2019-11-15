// @LINK: https://stackoverflow.com/questions/784539/how-do-i-replace-all-line-breaks-in-a-string-with-br-tags
const replaceNewLines = (text: string, substitute = "<br />") => text.replace(/(?:\r\n|\r|\n)/g, substitute)
export default replaceNewLines
