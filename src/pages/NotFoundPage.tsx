import React from "react"
import { RouteComponentProps } from "@reach/router"

type Props = RouteComponentProps

const NotFoundPage: React.FC<Props> = () => {
  return <p>404</p>
}

export default NotFoundPage
