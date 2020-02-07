import React, { FC } from "react"
import { RouteComponentProps } from "@reach/router"
import Navigation from "../components/global/Navigation"
import PlanningResult from "../components/planning/PlanningResult"

type Props = RouteComponentProps

const PlanningResultPage: FC<Props> = () => {
  return (
    <>
      <Navigation />
      <PlanningResult />
    </>
  )
}

export default PlanningResultPage
