import React from "react"
import { RouteComponentProps } from "@reach/router"
import Teams from "../components/teams/Teams"
import BreadCrumbs from "../components/global/BreadCrumbs"

type Props = RouteComponentProps

const TeamsPage: React.FC<Props> = () => {
  const crumbs = [{ text: "Alle teams" }]
  return (
    <>
      <BreadCrumbs items={ crumbs }/>
      <Teams />
    </>
  )
}

export default TeamsPage
