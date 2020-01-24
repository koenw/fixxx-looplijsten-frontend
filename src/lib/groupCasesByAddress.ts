import displayAddress from "./displayAddress"

const groupCasesByAddress = (cases: BWVData[]) : BWVData[][] => {
  if (cases.length <= 1) return [cases]
  const obj = cases.reduce((acc, caseItem) => {
    const {
      street_name: streetName,
      street_number: streetNumber,
      suffix,
      suffix_letter: suffixLetter
    } = caseItem
    const address = displayAddress(streetName, streetNumber, suffix || undefined, suffixLetter || undefined)
    if (!acc.hasOwnProperty(address)) acc[address] = []
    acc[address].push(caseItem)
    return acc
  }, {} as Record<string, BWVData[]>)
  const addresses = Object.keys(obj).sort()
  return addresses.map(address => obj[address])
}

export default groupCasesByAddress
