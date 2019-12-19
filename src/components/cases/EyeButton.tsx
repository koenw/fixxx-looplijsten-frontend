import React, { FC, FormEvent } from "react"
import styled from "styled-components"
import { getBasepath } from "../../config/domain"

type Props = {
  onClick: (a: FormEvent) => void
  isOpen: boolean
}

const Span = styled.span`
  position: fixed
  z-index: 9
  bottom: 12px
  right: 12px
  background: white
  box-shadow: 0px 5px 8px rgba(0, 0, 0, 0.3);
  transition: box-shadow 0.2s ease-in-out
  width: 72px
  height: 72px
  border-radius: 36px
  &:hover {
    box-shadow: 0px 5px 8px rgba(0, 0, 0, 0.6)
  }
`

const Button = styled.button`
  cursor: pointer
  background: none
  border: none
  outline: none
  width: 100%
  height: 100%
  padding: 0
  background-repeat: no-repeat
  background-position: center
  background-size: 36px
`

const EyeButton: FC<Props> = ({ onClick, isOpen }) => {
  const name = isOpen ? "eye" : "eye-disabled"
  const filename = `${ name }@2x.png`
  const src = `${ getBasepath() }/icons/${ filename }`
  const style = { backgroundImage: `url(${ src })` }
  return <Span><Button onClick={ onClick } style={ style }>️</Button></Span>
}
export default EyeButton
