const displayAddress = (streetName: string, streetNumber: string | number, suffix?: string, etage?: string | number) =>
  `${ streetName } ${ streetNumber }${ suffix ? suffix : "" }${ etage ? `-${ etage }` : "" }`
  
export default displayAddress
