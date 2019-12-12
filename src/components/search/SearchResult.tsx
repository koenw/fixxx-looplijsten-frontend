import React, { FC, useContext, FormEvent } from "react"
import styled from "styled-components"
import { getUrl } from "../../config/domain"
import authToken from "../../utils/authToken"
import stateContext from "../../contexts/StateContext"
import Itinerary from "../itineraries/Itinerary"
import AddButton from "../itineraries/AddButton"

type Props = {
  cases: BWVData[]
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
const Span = styled.span`
  margin: 12px
  white-space: nowrap
`

const SearchResult: FC<Props> = ({ cases }) => {

  const {
    state: {
      hasItinerary,
      addItinerary
    }
  } = useContext(stateContext)

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
    <div className="SearchResult">
      { cases.map(caseItem => {
          const { case_id: caseId } = caseItem
          const isItinerary = hasItinerary(caseId)
          const showButton = isItinerary === false
          const showIsItinerary = isItinerary
          return (
            <Div key={ caseId }>
              <Itinerary itinerary={ caseItem } />
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
        })
      }
    </div>
  )
}
export default SearchResult
