const promiseSerial = (funcs: any) =>
  funcs.reduce((promise: any, func: any) =>
    promise.then((result: any) =>
      func().then(Array.prototype.concat.bind(result))),
      Promise.resolve([]))
export default promiseSerial
