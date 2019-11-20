import React, { FC } from "react"
import Itinerary from "../itineraries/Itinerary"
import AddButton from "../itineraries/AddButton"
import styled from "styled-components"

type Props = {
  results: SearchResults
}

const Div = styled.div`
  display: flex
  justify-content: space-between
  margin-top: 12px
`

const SearchResults: FC<Props> = ({ results }) => {
  return (
    <div className="SearchResults">
    {
      results.map(result => (
        <Div key={ result.id }>
          <Itinerary itinerary={ result } />
          <AddButton />
        </Div>
      ))
    }
    </div>
  )
}
export default SearchResults
