import React, { FC } from "react"
import useFetch from "../../hooks/useFetch"
import { Spinner } from "@datapunt/asc-ui"
import ErrorMessage from "../global/ErrorMessage"
import NoteForm from "./NoteForm"

type Props = {
  itineraryId: Id
  id?: Id
}

const Note: FC<Props> = ({ itineraryId, id }) => {

  const path = id !== undefined ? `notes/${ id }` : ""
  const immediateReturn = id === undefined
  const [note, isFetching, errorMessage] = useFetch(path, false, immediateReturn) as [Note | undefined, boolean, ErrorMessage]
  const showSpinner = isFetching
  const showNoteForm = !isFetching && errorMessage === undefined
  const noteValue = note !== undefined ? note.text : ""
  const showErrorMessage = errorMessage !== undefined

  return (
    <div className="Note">
      { showSpinner &&
        <Spinner size={ 60 } />
      }
      { showNoteForm &&
        <NoteForm itineraryId={ itineraryId } id={ id } value={ noteValue } />
      }
      { showErrorMessage &&
        <ErrorMessage text={ errorMessage! } />
      }
    </div>
  )
}
export default Note
