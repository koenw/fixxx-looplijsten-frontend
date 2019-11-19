import React, { FC } from "react"

type Props = {
  text: string
}

const ErrorMessage: FC<Props> = ({ text }) => {
  return (
    <div className="ErrorMessage">
      <p>{ text }</p>
    </div>
  )
}
export default ErrorMessage
