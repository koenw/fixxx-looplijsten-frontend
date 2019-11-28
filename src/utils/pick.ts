const pick = (obj: Record<string, any>, props: string[]) =>
  props.reduce(
    (acc, prop) =>
      obj[prop] !== undefined ? { ...acc, [prop]: obj[prop] } : acc,
    {}
  )
export default pick
