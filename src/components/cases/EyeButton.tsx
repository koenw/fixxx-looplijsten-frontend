import React, { FC, FormEvent } from "react"
import styled from "styled-components"

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
  font-size: 48px
  background: none
  border: none
  outline: none
  text-align: center
  width: 100%
  padding: 0
  padding-top: 9px
`

const EyeButton: FC<Props> = ({ onClick, isOpen }) => {
  const emoji = isOpen ? "👁" : "🕶️"
  return <Span><Button onClick={ onClick }>️{ emoji }</Button></Span>
}
export default EyeButton
