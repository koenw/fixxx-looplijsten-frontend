import React from "react"
import CaseDetail from "../components/CaseDetail"
import BreadCrumbs from "../components/BreadCrumbs"
import { RouteComponentProps } from "@reach/router"

type Props = RouteComponentProps & {
  caseId?: string
}

const CasePage: React.FC<Props> = ({ caseId }) => {

  const id = parseInt(caseId!, 10)
  const showCaseDetail = !Number.isNaN(id)
  const crumbs = [
    { text: "Teams", path: "/" },
    { text: "Looplijst", path: "/team/TODO-teamId" },
    { text: "Case" }
  ]

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
