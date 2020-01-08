import React, { FC, useContext, FormEvent, MouseEvent } from "react"
import NoteTextarea from "./NoteTextarea"
import { Button } from "@datapunt/asc-ui"
import styled from "styled-components"
import useOnChangeState from "../../hooks/useOnChangeState"
import { navigate } from "@reach/router"
import { to } from "../../config/domain"
import stateContext from "../../contexts/StateContext"
import currentTime from "../../utils/currentTime"

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

const NoteForm: FC<Props> = ({ itineraryId, id, value }) => {

  const {
    state: {
      itinerariesActions: {
        setNote
      }
    }
  } = useContext(stateContext)

  const [text, onChangeText] = useOnChangeState(value)
  const showButton = text === ""
  const nawText = "NAW"

  const saveNote = async (text: string) => {
    const result = await setNote(itineraryId, text, id)
    if (result) {
      navigate(to("/"))
    } else {
      alert("Opslaan mislukt")
    }
  }

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault()
    const trimmedText = text.trim()
    await saveNote(trimmedText)
  }

  const onClick = async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    event.stopPropagation()
    const time = currentTime()
    const text = `${ nawText } ${ time } uur`
    await saveNote(text)
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
