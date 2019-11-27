import React, { FC } from "react"
import isAnonymous from "../../config/isAnonymous"

const Anonymous: FC = () => {
  return isAnonymous ? <style>{ ".anonymous { color: transparent; text-shadow: 0 0 15px rgba(0,0,0,0.5); }" }</style> : null
}
export default Anonymous
