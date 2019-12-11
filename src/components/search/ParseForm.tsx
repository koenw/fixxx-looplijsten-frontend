import React, { FC, useState, useContext, useEffect, FormEvent } from "react"
import { Button, Spinner } from "@datapunt/asc-ui"
import { Search } from "@datapunt/asc-assets"
import styled from "styled-components"
import TextareaBase from "../styled/Textarea"
import useOnChangeState from "../../hooks/useOnChangeState"
import { getUrl } from "../../config/domain"
import authToken from "../../utils/authToken"
import SearchResults from "./SearchResults"
import stateContext from "../../contexts/StateContext"
import AddAllButton from "./AddAllButton"
import parseAddressLine from "../../utils/parseAddressLine"
import promiseSerial from "../../utils/promiseSerial"

const ButtonWrap = styled.div`
  display: flex
  justify-content: flex-end
`
const AddAllButtonWrap = styled(ButtonWrap)`
  margin-top: 24px
`
const Form = styled.form`
  max-width: 768px
`
const Textarea = styled(TextareaBase)`
  width: 100%
`

type SearchQueryParams = [PostalCode, StreetNumber, StreetSuffix | undefined]
type OptionalSearchQueryParams = SearchQueryParams | undefined

type FetchResult = { cases: BWVData[] }
type FetchResults = FetchResult[]

const toSearchResult = (data?: BWVData, error?: string) : SearchResult => {
  const success = data !== undefined
  return {
    success,
    data,
    error
  }
}

const parse = (text: string) : OptionalSearchQueryParams[] => {
  const lines = text.split(/\r?\n/)
  return lines.map(line => parseAddressLine(line))
}

const fetchOne = (item: SearchQueryParams) : Promise<Response> => {
  const params = { postalCode: item[0].toUpperCase(), streetNumber: item[1], suffix: item[2] || "" }
  const url = getUrl("search", params)
  const token = authToken.get()
  return fetch(url, {
    headers: {
      Accept: "application/json",
      Authorization: `Token ${ token }`,
      "Content-Type": "application/json"
    }
  })
}

const fetchAll = async (items: SearchQueryParams[]) : Promise<FetchResults> => {

  const promises = items.map(item => fetchOne(item))

  try {
    const results = await Promise.all(promises)
    return await Promise.all(results.map(result => result.json()))
  } catch (err) {
    console.error(err)
  }
  return []
}

const ParseForm: FC = () => {

  const {
    state: {
      parse: parseState,
      setParse,
      hasItinerary,
      addItinerary
    }
  } = useContext(stateContext)

  const [results, setResults] = useState<SearchResults | undefined>()
  const [value, onChangeValue] = useOnChangeState(parseState)
  const [showSpinner, setShowSpinner] = useState(false)
  const hasResults = results && results.length > 0
  const showResults = hasResults && !showSpinner
  const showAddAllButton = showResults

  const search = async () => {
    if (value.trim() === "") return
    const results = parse(value).filter(params => params !== undefined) as SearchQueryParams[]
    const fetchResults = await fetchAll(results) || []
    const itineraries = fetchResults.map((fetchResult, index) =>
      fetchResult.cases.length > 0 ?
        toSearchResult(fetchResult.cases[0]) :
        toSearchResult(undefined, `Query: ${ results[index][0] }, ${ results[index][1]}, ${ results[index][2] }`))

    setResults(itineraries)
  }

  useEffect(() => {
    search()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault()
    setShowSpinner(true)
    setParse(value)
    await search()
    setShowSpinner(false)
  }

  const onClick = async (event: any) => {

    event.preventDefault()

    if (results === undefined) return

    const save = async (id: CaseId) => {
      const url = getUrl("itineraries/items")
      const token = authToken.get()
      const response = await fetch(url, {
        method: "POST",
        headers: {
          Accept: "application/json",
          Authorization: `Token ${ token }`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ id })
      })
      if (response.ok) {
        return await response.json() as Itinerary
      }
    }

    const filteredResults = results.filter(result => result.data && !hasItinerary(result.data.case_id))
    if (filteredResults.length === 0) return
    const funcs = filteredResults.map(result => () => save(result.data!.case_id))
    const resolved = await promiseSerial(funcs)
    const itineraries = resolved.filter((result: Itinerary | undefined) => result !== undefined) as Itineraries
    addItinerary(itineraries)
  }

  const addAllButton = <AddAllButtonWrap><AddAllButton onClick={ onClick } /></AddAllButtonWrap>

  return (
    <div className="ParseForm">
      <Form onSubmit={ onSubmit }>
        <Textarea rows={ 16 } value={ value } onChange={ onChangeValue } autoFocus />
        <ButtonWrap>
          <Button variant="secondary" size={ 60 } icon={ <Search /> } />
        </ButtonWrap>
      </Form>
      { showSpinner &&
        <Spinner size={ 60 } />
      }
      { showAddAllButton &&
        addAllButton
      }
      { showResults &&
        <SearchResults results={ results } />
      }
      { showAddAllButton &&
        addAllButton
      }
    </div>
  )
}
export default ParseForm
