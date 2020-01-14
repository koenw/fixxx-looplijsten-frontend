import React, { FC, useContext } from "react"
import stateContext from "../../contexts/StateContext"
import { Spinner } from "@datapunt/asc-ui"
import NoteForm from "./NoteForm"

type Props = {
  itineraryId: Id
  id?: Id
}

const Note: FC<Props> = ({ itineraryId, id }) => {

  const {
    state: {
      itineraries: {
        isFetching
      },
      getItineraryNote
    }
  } = useContext(stateContext)

  const note = id !== undefined ? getItineraryNote(itineraryId, id) : undefined
  const noteValue = note !== undefined ? note.text : ""
  const showSpinner = isFetching
  const showNoteForm = !isFetching

  return (
    <div className="Note">
      { showSpinner &&
        <Spinner size={ 60 } />
      }
      { showNoteForm &&
        <NoteForm itineraryId={ itineraryId } id={ id } value={ noteValue } />
      }
    </div>
  )
}
export default Note
