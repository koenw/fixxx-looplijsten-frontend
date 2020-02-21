import React, { FC } from "react"
import { RouteComponentProps } from "@reach/router"
import NavigationPlanning from "../components/global/NavigationPlanning"
import DayPlanning from "../components/planning/DayPlanning"

type Props = RouteComponentProps

const DayPlanningPage: FC<Props> = () => {
  return (
    <>
      <NavigationPlanning />
      <DayPlanning />
    </>
  )
}

export default DayPlanningPage
