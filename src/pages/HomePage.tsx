import React from "react"
import Looplijst from "../components/Looplijst"
import { RouteComponentProps } from "@reach/router"

type Props = RouteComponentProps

const HomePage: React.FC<Props> = () => {
  return <Looplijst />
}

export default HomePage
