import React, { FC } from "react"
import { RouteComponentProps } from "@reach/router"
import NavigationPlanning from "../components/global/NavigationPlanning"
import Planning from "../components/planning/Planning"

type Props = RouteComponentProps

const PlanningPage: FC<Props> = () => {
  return (
    <>
      <NavigationPlanning />
      <Planning />
    </>
  )
}

export default PlanningPage
