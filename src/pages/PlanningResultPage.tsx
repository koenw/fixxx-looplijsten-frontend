import React, { FC } from "react"
import { RouteComponentProps } from "@reach/router"
import NavigationPlanning from "../components/global/NavigationPlanning"
import PlanningResult from "../components/planning/PlanningResult"

type Props = RouteComponentProps

const PlanningResultPage: FC<Props> = () => {
  return (
    <>
      <NavigationPlanning />
      <PlanningResult />
    </>
  )
}

export default PlanningResultPage
