import React, { FC, FormEvent, MouseEvent } from "react"
import NoteTextarea from "./NoteTextarea"
import { Button } from "@datapunt/asc-ui"
import styled from "styled-components"
import useOnChangeState from "../../hooks/useOnChangeState"
import { navigate } from "@reach/router"
import { to } from "../../config/domain"

const ButtonWrap = styled.div`
  display: flex
  justify-content: flex-end
  button {
    margin-left: 6px
  }
`

type Props = {
  itineraryId: Id
}

const NoteForm: FC<Props> = ({ itineraryId }) => {

  const key = `itinerary_${ itineraryId }`
  const defaultState = window.localStorage.getItem(key) || ""
  const [text, onChangeText] = useOnChangeState(defaultState)

  const onSubmit = (event: FormEvent) => {
    event.preventDefault()
    window.localStorage.setItem(key, text)
    navigate(to("/"))
  }

  const showButton = text === ""

  const nawText = "NAW"

  const onClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    event.stopPropagation()
    window.localStorage.setItem(key, nawText)
    navigate(to("/"))
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
