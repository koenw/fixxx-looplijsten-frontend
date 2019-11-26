import React, { FC } from "react"
import Navigation from "../components/global/Navigation"
import { RouteComponentProps } from "@reach/router"
import NoteForm from "../components/notes/NoteForm"

type Props = RouteComponentProps & {
  itineraryId?: string
}

const NotePage: FC<Props> = ({ itineraryId }) => {
  const showNoteForm = itineraryId !== undefined
  return (
    <>
      <Navigation />
      { showNoteForm &&
        <NoteForm itineraryId={ parseInt(itineraryId!, 10) } />
      }
    </>
  )
}

export default NotePage
