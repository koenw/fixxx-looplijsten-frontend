import React, { FC, useContext } from "react"
import styled from "styled-components"
import { Spinner } from "@datapunt/asc-ui"
import ErrorMessage from "../global/ErrorMessage"
import DroppableItineraries from "./DroppableItineraries"
import stateContext from "../../contexts/StateContext"
import RemoveAllButton from "./RemoveAllButton"

type Result = {
  id: Id,
  items: Itineraries
  user: string
}

const ButtonWrap = styled.div`
  display: flex
  justify-content: flex-end
  margin-top: 24px
`
const ButtonWrapBottom = styled(ButtonWrap)`
  margin-top: -44px
`

const Itineraries: FC = () => {

  const {
    state: {
      itineraries,
      itinerariesIsFetching: isFetching,
      itinerariesErrorMessage: errorMessage,
      removeAllItineraries
    }
  } = useContext(stateContext)

  const showSpinner = isFetching
  const showError = errorMessage !== undefined
  const show = !showSpinner && !showError
  const hasItineraries = itineraries.length > 0

  const emptyText = "Je looplijst is leeg. Zoek adressen om aan je looplijst toe te voegen."

  const onClick = () => removeAllItineraries()
  const RemoveAllButtonTop: FC = () => <ButtonWrap><RemoveAllButton onClick={ onClick } /></ButtonWrap>
  const RemoveAllButtonBottom: FC = () => <ButtonWrapBottom><RemoveAllButton onClick={ onClick } /></ButtonWrapBottom>

  return (
    <div className="Itineraries">
      { showSpinner &&
        <Spinner size={ 60 } />
      }
      { show && (
          hasItineraries ?
            <>
              <RemoveAllButtonTop />
              <DroppableItineraries itineraries={ itineraries } />
              <RemoveAllButtonBottom />
            </> :
            <p>{ emptyText }</p>
        )
      }
      { showError &&
        <ErrorMessage text={ errorMessage! } />
      }
    </div>
  )
}
export default Itineraries
