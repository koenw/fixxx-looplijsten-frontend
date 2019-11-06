import React from "react"
import CaseDetail from "../components/CaseDetail"
import { RouteComponentProps } from "@reach/router"

type Props = RouteComponentProps & {
  caseId?: string
}

const CasePage: React.FC<Props> = ({ caseId }) => {

  const id = parseInt(caseId!, 10)
  const showCaseDetail = !Number.isNaN(id)

  return showCaseDetail ? <CaseDetail caseId={ id } /> : null
}

export default CasePage
