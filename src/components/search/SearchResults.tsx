import React, { FC, FormEvent, useContext } from "react"
import Itinerary from "../itineraries/Itinerary"
import AddButton from "../itineraries/AddButton"
import styled from "styled-components"
import { getUrl } from "../../config/domain"
import authToken from "../../utils/authToken"
import stateContext from "../../contexts/StateContext"
import EmptySearchResult from "./EmptySearchResult"

type Props = {
  results?: SearchResults
}

const Div = styled.div`
  display: flex
  justify-content: space-between
  margin-top: 12px
  border-bottom: 4px solid #767676
`
const ButtonWrap = styled.div`
  margin: 24px 0
`
const P = styled.p`
  margin-top: 12px
`
const Span = styled.span`
  margin: 12px
  white-space: nowrap
`

const SearchResults: FC<Props> = ({ results }) => {

  const {
    state: {
      hasItinerary,
      addItinerary
    }
  } = useContext(stateContext)

  const showResults = results && results.length > 0
  const showEmpty = results && results.length === 0

  const onClick = (id: CaseId) => async (event: FormEvent) => {

    event.preventDefault()

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
      const itinerary = await response.json() as Itinerary
      addItinerary(itinerary)
    }
  }

  return (
    <div className="SearchResults">
    {
      showResults &&
      results!.map(result => {
        const { success, data, error } = result
        if (success && data !== undefined) {
          const { cases } = data
          if (cases.length) {
            const itinerary = cases[0]
            const { case_id: caseId } = itinerary
            const isItinerary = hasItinerary(caseId)
            const showButton = isItinerary === false
            const showIsItinerary = isItinerary
            return (
              <Div key={ caseId }>
                <Itinerary itinerary={ itinerary } />
                <ButtonWrap>
                  { showButton &&
                    <AddButton onClick={ onClick(caseId) } disabled={ isItinerary } />
                  }
                  { showIsItinerary &&
                    <Span>In looplijst</Span>
                  }
                </ButtonWrap>
              </Div>
            )
          } else {
            return <EmptySearchResult text={ error } />
          }
        } else {
          return <EmptySearchResult text={ error } />
        }
      })
    }
    { showEmpty &&
      <P>Geen resultaten</P>
    }
    </div>
  )
}
export default SearchResults
