import React from "react"
import CaseDetail from "../components/cases/CaseDetail"
import Navigation from "../components/global/Navigation"
import { RouteComponentProps } from "@reach/router"

type Props = RouteComponentProps & {
  teamId?: string
  caseId?: string
}

const CasePage: React.FC<Props> = ({ teamId, caseId }) => {
  return (
    <>
      <Navigation />
      { caseId &&
        <CaseDetail caseId={ caseId } />
      }
    </>
  )
}

export default CasePage
