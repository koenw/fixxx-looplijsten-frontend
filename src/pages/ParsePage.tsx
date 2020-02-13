import React, { FC } from "react"
import { RouteComponentProps } from "@reach/router"
import Navigation from "../components/global/Navigation"
import ParseForm from "../components/search/ParseForm"

type Props = RouteComponentProps

const ParsePage: FC<Props> = () => {
  return (
    <>
      <Navigation />
      <ParseForm />
    </>
  )
}

export default ParsePage
