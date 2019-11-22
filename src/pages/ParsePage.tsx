import React from "react"
import { RouteComponentProps } from "@reach/router"
import Navigation from "../components/global/Navigation"
import ParseForm from "../components/search/ParseForm"

type Props = RouteComponentProps

const ParsePage: React.FC<Props> = () => {
  return (
    <>
      <Navigation />
      <ParseForm />
    </>
  )
}

export default ParsePage
