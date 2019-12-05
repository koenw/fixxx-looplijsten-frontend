const displayAddress = (streetName: string, streetNumber: string | number, suffix?: string, etage?: string | number) => {
  // @TODO: Normalize etage and suffix
  /*
  const showHyphen = etage !== undefined && suffix === undefined
  const showSpace = !showHyphen && (suffix !== undefined || etage !== undefined)
  const connection = showHyphen ? "-" : showSpace ? " " : ""
  */
  const connection = suffix !== undefined || etage !== undefined ? " " : ""
  return `${ streetName } ${ streetNumber }${ connection }${ suffix ? suffix : "" }${ etage ? etage : "" }`
}
export default displayAddress
