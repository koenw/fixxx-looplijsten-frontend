import parseLocationSearch from "../lib/utils/parseLocationSearch"

const hostname = window.location.hostname
console.log(hostname)
export const isProduction = hostname === "top.amsterdam.nl"
export const isAcc = hostname === "acc.straatnotes.amsterdam.nl"
export const isDevelopment = hostname === "localhost"
const { api } = parseLocationSearch(window.location.search)
export const forceAcc = isDevelopment || api === "acc"
