import React from "react"
import { RouteComponentProps } from "@reach/router"
import Team from "../components/Team"
import BreadCrumbs from "../components/BreadCrumbs"

type Props = RouteComponentProps & {
  teamId?: string
}

const TeamPage: React.FC<Props> = ({ teamId }) => {

  const crumbs = [{ text: "Alle teams", path: "/" }, { text: "Looplijst" }]

  const id = parseInt(teamId!, 10)
  const showTeam = !Number.isNaN(id)

  return (
    <>
      <BreadCrumbs items={ crumbs } />
      { showTeam &&
        <Team id={ id } />
      }
    </>
  )
}

export default TeamPage
