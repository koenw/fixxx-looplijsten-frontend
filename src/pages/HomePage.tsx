import React from "react"
import Looplijst from "../components/Looplijst"
import BreadCrumbs from "../components/BreadCrumbs"
import { RouteComponentProps } from "@reach/router"

type Props = RouteComponentProps

const HomePage: React.FC<Props> = () => {
  const crumbs = [{ text: "Looplijsten" }]
  return (
    <>
      <BreadCrumbs items={ crumbs }/>
      <Looplijst />
    </>
  )
}

export default HomePage
