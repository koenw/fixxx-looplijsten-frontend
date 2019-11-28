import parseLocationSearch from "../utils/parseLocationSearch"

const anonymous = parseLocationSearch(window.location.search).anonymous
const isAnonymous = anonymous === "1"

export default isAnonymous
