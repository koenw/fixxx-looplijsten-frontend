import React, { FC, FormEvent } from "react"
import { Button, Spinner } from "@datapunt/asc-ui"
import { Search } from "@datapunt/asc-assets"
import styled from "styled-components"
import TextareaBase from "../styled/Textarea"
import Hr from "../styled/Hr"
import useOnChangeState from "../../hooks/useOnChangeState"
import useGlobalState from "../../hooks/useGlobalState"
import SearchResults from "./SearchResults"
import AddAllButton from "./AddAllButton"
import ClearButton from "./ClearButton"

const ButtonWrap = styled.div`
  display: flex
  justify-content: flex-end
  margin-top: 12px
`
const AddAllButtonWrap = styled(ButtonWrap)`
  margin: 24px 0
`
const Textarea = styled(TextareaBase)`
  display: block
  width: 100%
`
const ClearButtonWrap = styled.div`
  margin-top: 12px
  display: flex
  justify-content: flex-start
`

const ParseForm: FC = () => {

  const {
    parse: {
      isFetching,
      query,
      results
    },
    parseActions: {
      parse,
      clear
    },
    hasItinerary,
    itinerariesActions: {
      addMany
    }
  } = useGlobalState()

  const [value, onChangeValue, setValue] = useOnChangeState(query || "")
  const showSpinner = isFetching
  const showResults = results !== undefined && results.length > 0 && !isFetching
  const nonItineraries = (results || [])
    .map(result => result.data ? result.data.cases : [])
    .flat(1)
    .filter(caseItem => !hasItinerary(caseItem.case_id))
  const showAddAllButton = showResults && nonItineraries.length > 0

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

    await addMany(caseIds)
  }

  const onClickClear = () => {
    setValue("")
    clear()
  }

  const AddAll = () => (
    <AddAllButtonWrap>
      <AddAllButton onClick={ onClick } disabled={ isFetching }/>
    </AddAllButtonWrap>
  )


  return (
    <div className="ParseForm">
      <form onSubmit={ onSubmit }>
        <Textarea rows={ 16 } value={ value } onChange={ onChangeValue } autoFocus />
        <ClearButtonWrap>
          <ClearButton onClick={ onClickClear } />
        </ClearButtonWrap>
        <ButtonWrap>
          <Button variant="secondary" iconLeft={ <Search /> }>Zoek alles</Button>
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
