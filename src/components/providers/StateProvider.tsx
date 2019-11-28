import React, { FC, ReactNode, useState } from "react"
import StateContext from '../../contexts/StateContext'

type Props = {
  children: ReactNode
}

const StateProvider: FC<Props> = ({ children }) => {

  const [postalCode, setPostalCode] = useState("")
  const [streetNumber, setStreetNumber] = useState("")
  const [suffix, setSuffix] = useState("")
  const setSearch = (postalCode: string, streetNumber: string, suffix: string) => {
    setPostalCode(postalCode)
    setStreetNumber(streetNumber)
    setSuffix(suffix)
  }

  const [parse, setParse] = useState("")

  const value = {
    state: {
      search: {
        postalCode,
        streetNumber,
        suffix
      },
      setSearch,
      parse,
      setParse
    }
  }

  return (
    <StateContext.Provider value={ value }>
      { children }
    </StateContext.Provider>
  )
}
export default StateProvider
