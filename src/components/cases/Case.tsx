import React, { FC } from "react"
import useFetch from "../../hooks/useFetch"
import { Spinner } from "@datapunt/asc-ui"
import CaseDetail from "./CaseDetail"
import AnonymousToggle from "./AnonymousToggle"
import ErrorMessage from "../global/ErrorMessage"

type Props = {
  caseId: CaseId
}

const Case: FC<Props> = ({ caseId }) => {

  const [caseItem, isFetching, errorMessage] = useFetch(`cases/${ caseId }`) as [Case, boolean, ErrorMessage]

  const showSpinner = isFetching
  const show = caseItem !== undefined
  const showErrorMessage = errorMessage !== undefined

  return (
    <div className="CaseDetail">
      { showSpinner &&
        <Spinner size={ 60 } />
      }
      { show &&
        <>
          <CaseDetail caseId={ caseId } caseItem={ caseItem! } />
          <AnonymousToggle />
        </>
      }
      { showErrorMessage &&
        <ErrorMessage text={ errorMessage! } />
      }
    </div>
  )
}
export default Case
