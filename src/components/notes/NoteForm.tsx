import React, { FC, useContext, FormEvent, MouseEvent } from "react"
import NoteTextarea from "./NoteTextarea"
import { Button } from "@datapunt/asc-ui"
import styled from "styled-components"
import useOnChangeState from "../../hooks/useOnChangeState"
import { navigate } from "@reach/router"
import { to } from "../../config/domain"
import { getUrl } from "../../config/domain"
import authToken from "../../utils/authToken"
import stateContext from "../../contexts/StateContext"

const ButtonWrap = styled.div`
  display: flex
  justify-content: flex-end
  button {
    margin-left: 6px
  }
`

type Props = {
  itineraryId: Id
  id?: Id
  value: string
}

const save = (itineraryId: Id, text: string, id?: Id) => {

  const path = `notes/${ id || "" }`
  const url = getUrl(path)
  const method = text === "" ? "DELETE" : id !== undefined ? "PUT" : "POST"

  const token = authToken.get()
  return fetch(url, {
    method,
    headers: {
      Authorization: `Token ${ token }`,
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ itinerary_item: itineraryId, text })
  })
}

const NoteForm: FC<Props> = ({ itineraryId, id, value }) => {

  const {
    state: {
      updateItineraryNote
    }
  } = useContext(stateContext)

  const [text, onChangeText] = useOnChangeState(value)

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault()
    const trimmedText = text.trim()
    const response = await save(itineraryId, trimmedText, id)
    const note = await response.json()
    updateItineraryNote(note.itinerary_item, note.id, note.text)
    if (response.ok) {
      navigate(to("/"))
    } else {
      alert("Opslaan mislukt")
    }
  }

  const showButton = text === ""

  const nawText = "NAW"

  const onClick = async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    event.stopPropagation()
    const response = await save(itineraryId, nawText, id)
    const note = await response.json()
    updateItineraryNote(note.itinerary_item, note.id, note.text)
    if (response.ok) {
      navigate(to("/"))
    } else {
      alert("Opslaan mislukt")
    }
  }

  return (
    <form onSubmit={ onSubmit }>
      <NoteTextarea text={ text } onChange={ onChangeText } />
      <ButtonWrap>
        { showButton &&
          <Button variant="secondary" onClick={ onClick }>{ nawText }</Button>
        }
        <Button variant="secondary">Opslaan</Button>
      </ButtonWrap>
    </form>
  )
}
export default NoteForm
