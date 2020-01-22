import React, { FC, FormEvent } from "react"
import styled from "styled-components"
import { getBasepath } from "../../config/domain"

type Props = {
  onClick: (a: FormEvent) => void
  isOpen: boolean
}

const Span = styled.span`
  display: inline-block
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
`
const Img = styled.img`
  padding: 24px 18px
  width: 36px
  height: 24px
`
const ImgDisabled = styled.img`
  padding: 18px
  width: 36px
  height: 36px
`

const EyeButton: FC<Props> = ({ onClick, isOpen }) => {
  const getImgUrl = (name: string) => `${ getBasepath() }/icons/${ name }@2x.png`
  const getStyle = (isHidden: boolean) => isHidden ? { display: "none" } : undefined
  return (
    <Span>
      <Button onClick={ onClick }>️
        <Img src={ getImgUrl("eye") } style={ getStyle(!isOpen) } />
        <ImgDisabled src={ getImgUrl("eye-disabled") } style={ getStyle(isOpen) } />
      </Button>
    </Span>
  )
}
export default EyeButton
