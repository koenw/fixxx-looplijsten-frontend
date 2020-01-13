import React, { FC, useState, useContext, useEffect, FormEvent } from "react"
import { Button, Spinner } from "@datapunt/asc-ui"
import { Search } from "@datapunt/asc-assets"
import styled from "styled-components"
import TextareaBase from "../styled/Textarea"
import Hr from "../styled/Hr"
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
  margin-top: 12px
`
const AddAllButtonWrap = styled(ButtonWrap)`
  margin-top: 24px
`
const Form = styled.form`
  max-width: 768px
`
const Textarea = styled(TextareaBase)`
  display: block
  width: 100%
`

type ParseResult = {
  success: boolean
  raw: string
  params?: SearchQueryParams
}
type ParseResults = ParseResult[]
type SearchQueryParams = [PostalCode, StreetNumber, StreetSuffix | undefined]
type OptionalSearchQueryParams = SearchQueryParams | undefined

type FetchResult = { cases: BWVData[] }
type FetchResults = FetchResult[]

const toSearchResult = (data?: { cases: BWVData[] }, error?: string) : SearchResult => {
  const success = data !== undefined
  return { success, data, error }
}

const parse = (text: string) : ParseResults => {
  return text
    .split(/\r?\n/) // split into lines
    .map(line => line.trim()) // trim lines
    .filter(line => line !== "") // remove empty lines
    .map(line => { // parse lines
      const params = parseAddressLine(line)
      const success = params !== undefined
      const raw = line
      return { success, raw, params }
    })
}

const fetchOne = (item: SearchQueryParams) : Promise<Response> => {
  const params = { postalCode: item[0].toUpperCase(), streetNumber: item[1], suffix: item[2] || "" }
  const url = getUrl("search", params)
  const token = authToken.get()
  return fetch(url, {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${ token }`,
      "Content-Type": "application/json"
    }
  })
}

const awaitSearchResult = async (result: ParseResult) : Promise<SearchResult> => {
  if (result.success === false) return toSearchResult(undefined, result.raw)
  try {
    const params = result.params!
    const response = await fetchOne(params)
    const json = await response.json()
    return json.cases.length > 0 ?
      toSearchResult(json) :
      toSearchResult(undefined, `postcode: ${ params[0] }, huisnummer: ${ params[1] }, toevoeging: ${ params[2] || "" }`)
  } catch (err) {
    console.error(err)
  }
  return toSearchResult(undefined, "Fetch error")
}

const fetchResults = async (results: ParseResults) : Promise<SearchResults> => {

  const promises = results.map(result => awaitSearchResult(result))

  try {
    return await Promise.all(promises)
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
      itinerariesActions: {
        add
      }
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
    const parseResults = parse(value)
    const results = await fetchResults(parseResults)
    setResults(results)
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
