import React, { FC } from "react"
import useGlobalState from "../../hooks/useGlobalState"
import styled from "styled-components"
import EyeButton from "./EyeButton"

const Div = styled.div`
  position: fixed
  z-index: 9
  width: calc(100% - 12px);
  bottom: 0
  left: 0
  height: 84px
  display: flex
  justify-content: flex-end
  padding-right: 12px
  padding-top: 12px
`

const Span = styled.span`
  display: inline-block
  height: 23px
  margin-top: 20px
  margin-right: 12px
  background: rgba(0, 0, 0, 0.6);
  color: white
  padding: 4px 8px
  border-radius: 4px
`

const AnonymousToggle: FC = () => {

  const {
    isAnonymous,
    toggleIsAnonymous
  } = useGlobalState()

  const showMessage = isAnonymous

  const onClick = () => toggleIsAnonymous()

  return (
    <Div className="AnonymousToggle">
      { showMessage &&
        <Span>Privé modus staat aan</Span>
      }
      <EyeButton onClick={ onClick } isOpen={ isAnonymous } />
    </Div>
  )
}
export default AnonymousToggle
