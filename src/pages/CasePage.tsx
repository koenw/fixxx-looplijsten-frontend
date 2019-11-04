import React from "react"
import CaseDetail from "../components/CaseDetail"
import { RouteComponentProps } from "@reach/router"

type Props = RouteComponentProps & {
  caseId?: string
}

const CasePage: React.FC<Props> = () => {
  return <CaseDetail />
}

export default CasePage
