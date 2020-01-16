import React, { FC } from "react"
import styled from "styled-components"

type Props = {
  name: string
}

const A = styled.a`
  position: relative
  left: 0
  top: -125px
`

const Anchor: FC<Props> = ({ name }) => <A id={ name }></A>

export default Anchor
