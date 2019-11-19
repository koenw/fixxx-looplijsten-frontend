import React from "react"
import CaseDetail from "../components/cases/CaseDetail"
import BreadCrumbs from "../components/global/BreadCrumbs"
import { RouteComponentProps } from "@reach/router"

type Props = RouteComponentProps & {
  teamId?: string
  caseId?: string
}

const CasePage: React.FC<Props> = ({ teamId, caseId }) => {

  const crumbs = [
    { text: "Alle teams", path: "/" },
    { text: "Adres" }
  ]
  if (teamId) {
    const id = parseInt(teamId, 10)
    crumbs.splice(1, 0, { text: "Looplijst", path: `/teams/${ id }` })
  }

  const id = parseInt(caseId!, 10)
  const showCaseDetail = !Number.isNaN(id)

  return (
    <>
      <BreadCrumbs items={ crumbs } />
      { showCaseDetail &&
        <CaseDetail caseId={ id } />
      }
    </>
  )
}

export default CasePage
