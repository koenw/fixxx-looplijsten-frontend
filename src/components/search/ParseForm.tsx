import React, { FC, FormEvent } from "react"
import { Button, Spinner } from "@datapunt/asc-ui"
import { Search } from "@datapunt/asc-assets"
import styled from "styled-components"
import TextareaBase from "../styled/Textarea"
import Hr from "../styled/Hr"
import useOnChangeState from "../../hooks/useOnChangeState"
import SearchResults from "./SearchResults"
import AddAllButton from "./AddAllButton"
import promiseSerial from "../../lib/utils/promiseSerial"
import useGlobalState from "../../hooks/useGlobalState"

const ButtonWrap = styled.div`
  display: flex
  justify-content: flex-end
  margin-top: 12px
`
const AddAllButtonWrap = styled(ButtonWrap)`
  margin-top: 24px
`
const Textarea = styled(TextareaBase)`
  display: block
  width: 100%
`

const ParseForm: FC = () => {

  const {
    parse: {
      isFetching,
      query,
      results
    },
    parseActions: {
      parse
    },
    hasItinerary,
    itinerariesActions: {
      add
    }
  } = useGlobalState()

  const [value, onChangeValue] = useOnChangeState(query)
  const showSpinner = isFetching
  const showResults = results !== undefined && results.length > 0 && !isFetching
  const showAddAllButton = showResults && results!.length > 1

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault()
    if (value.trim() === "") return
    parse(value)
  }

  const onClick = async (event: any) => {

    event.preventDefault()

    if (results === undefined) return

    // get case ids from search results
    const caseIds = results.reduce((acc, item) => {
      if (item.data === undefined) return acc
      item.data.cases.forEach(caseItem => {
        const { case_id: caseId } = caseItem
        if (hasItinerary(caseId)) return
        acc.push(caseId)
      })
      return acc
    }, [] as CaseIds)
    if (caseIds.length === 0) return

    // sequentially add each case to itineraries, so order is maintained
    const funcs = caseIds.map(caseId => async () => add(caseId))
    await promiseSerial(funcs)
  }

  const AddAll = () => (
    <AddAllButtonWrap>
      <AddAllButton onClick={ onClick } />
    </AddAllButtonWrap>
  )

  return (
    <div className="ParseForm">
      <form onSubmit={ onSubmit }>
        <Textarea rows={ 16 } value={ value } onChange={ onChangeValue } autoFocus />
        <ButtonWrap>
          <Button variant="secondary" size={ 60 } icon={ <Search /> } />
        </ButtonWrap>
      </form>
      { showSpinner &&
        <Spinner size={ 60 } />
      }
      { showAddAllButton &&
        <>
          <AddAll />
          <Hr />
        </>
      }
      { showResults &&
        <SearchResults results={ results } />
      }
      { showAddAllButton &&
        <AddAll />
      }
    </div>
  )
}
export default ParseForm
