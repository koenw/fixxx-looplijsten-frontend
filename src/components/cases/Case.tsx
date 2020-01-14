import React, { FC } from "react"
import useGlobalState from "../../hooks/useGlobalState"
import useFetch from "../../hooks/useFetch"
import { Spinner } from "@datapunt/asc-ui"
import CaseDetail from "./CaseDetail"
import EyeButton from "./EyeButton"
import ErrorMessage from "../global/ErrorMessage"

type Props = {
  caseId: CaseId
}

const Case: FC<Props> = ({ caseId }) => {

  const {
    isAnonymous,
    toggleIsAnonymous
  } = useGlobalState()

  const [caseItem, isFetching, errorMessage] = useFetch(`cases/${ caseId }`) as [Case, boolean, ErrorMessage]

  const showSpinner = isFetching
  const show = caseItem !== undefined
  const showErrorMessage = errorMessage !== undefined

  const onClick = () => toggleIsAnonymous()

  return (
    <div className="CaseDetail">
      { showSpinner &&
        <Spinner size={ 60 } />
      }
      { show &&
        <>
          <CaseDetail caseId={ caseId } caseItem={ caseItem! } />
          <EyeButton onClick={ onClick } isOpen={ isAnonymous } />
        </>
      }
      { showErrorMessage &&
        <ErrorMessage text={ errorMessage! } />
      }
    </div>
  )
}
export default Case
