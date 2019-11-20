import React, { FC, FormEvent } from "react"
import Itinerary from "../itineraries/Itinerary"
import AddButton from "../itineraries/AddButton"
import styled from "styled-components"
import { getUrl } from "../../config/domain"
import authToken from "../../utils/authToken"

type Props = {
  results?: SearchResults
}

const Div = styled.div`
  display: flex
  justify-content: space-between
  margin-top: 12px
`
const P = styled.p`
  margin-top: 12px
`

const SearchResults: FC<Props> = ({ results }) => {

  const showResults = results && results.length > 0
  const showEmpty = results && results.length === 0

  const onClick = (id: number) => async (event: FormEvent) => {

    event.preventDefault()

    const url = getUrl("itineraries/items")
    const token = authToken.get()
    await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: `Token ${ token }`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ id })
    })
  }

  return (
    <div className="SearchResults">
    {
      showResults &&
      results!.map(result => (
        <Div key={ result.id }>
          <Itinerary itinerary={ result } />
          <AddButton onClick={ onClick(result.id) } />
        </Div>
      ))
    }
    { showEmpty &&
      <P>Geen resultaten</P>
    }
    </div>
  )
}
export default SearchResults
