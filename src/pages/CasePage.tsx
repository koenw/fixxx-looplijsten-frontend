import React from "react"
import CaseDetail from "../components/cases/CaseDetail"
import Navigation from "../components/global/Navigation"
import { RouteComponentProps } from "@reach/router"

type Props = RouteComponentProps & {
  teamId?: string
  caseId?: string
}

const CasePage: React.FC<Props> = ({ teamId, caseId }) => {

  const id = parseInt(caseId!, 10)
  const showCaseDetail = !Number.isNaN(id)

  return (
    <>
      <Navigation />
      { showCaseDetail &&
        <CaseDetail caseId={ id } />
      }
    </>
  )
}

export default CasePage
