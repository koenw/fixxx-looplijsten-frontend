import React, { FC, useContext } from "react"
import StateContext from "../../contexts/StateContext"

const Anonymous: FC = () => {
  const { state: { isAnonymous } } = useContext(StateContext)
  return isAnonymous ? <style>{ ".anonymous { color: transparent; text-shadow: 0 0 15px rgba(0,0,0,0.5); }" }</style> : null
}
export default Anonymous
