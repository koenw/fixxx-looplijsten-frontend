// @LINK: https://stackoverflow.com/questions/679915/how-do-i-test-for-an-empty-javascript-object
const isEmptyObject = (obj: Object) => Object.entries(obj).length === 0 && obj.constructor === Object
export default isEmptyObject
