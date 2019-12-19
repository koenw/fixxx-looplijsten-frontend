import React, { FC, useContext, FormEvent } from "react"
import stateContext from "../../contexts/StateContext"
import IconButton from "../global/IconButton"
import styled from "styled-components"

type Props = {
  caseId: CaseId
}

const Div = styled.div`
  span {
    display: inline-block
    width: 100%
    text-align: center
    color: black
    font-weight: normal
  }
  button {
    margin: 10px
  }
`

const SearchResultButtonWrap: FC<Props> = ({ caseId }) => {

  const {
    state: {
      hasItinerary,
      itineraries: {
        itineraries
      },
      itinerariesActions: {
        add,
        remove
      }
    }
  } = useContext(stateContext)

  const onClickAdd = (event: FormEvent) => {
    event.preventDefault()
    add(caseId)
  }

  const onClickRemove = (event: FormEvent) => {
    event.preventDefault()
    const itinerary = itineraries.find(itinerary => itinerary.case.bwv_data.case_id === caseId)
    if (itinerary === undefined) return
    remove(itinerary.id)
  }

  const isItinerary = hasItinerary(caseId)
  const showAddButton = isItinerary === false
  const showRemoveButton = !showAddButton

  return (
    <div className="SearchResultButtonWrap">
      { showAddButton &&
        <IconButton icon="Enlarge" onClick={ onClickAdd } />
      }
      { showRemoveButton &&
        <Div>
          <span>In lijst</span>
          <IconButton icon="TrashBin" onClick={ onClickRemove } size={ 40 } border={ false } />
        </Div>
      }
    </div>
  )
}
export default SearchResultButtonWrap
