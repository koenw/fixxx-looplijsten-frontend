import React, { FC } from "react"
import { RouteComponentProps } from "@reach/router"
import Navigation from "../components/global/Navigation"
import Planning from "../components/planning/Planning"

type Props = RouteComponentProps

const PlanningPage: FC<Props> = () => {
  return (
    <>
      <Navigation />
      <Planning />
    </>
  )
}

export default PlanningPage
