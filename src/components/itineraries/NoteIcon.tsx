import React, { FC } from "react"
import { getBasepath } from "../../config/domain"
import styled from "styled-components"

const Img = styled.img`
  width: 20px
  height: 20px
`
const NoteIcon: FC = () => <Img src={ `${ getBasepath() }/icons/note@2x.png` } />
export default NoteIcon
