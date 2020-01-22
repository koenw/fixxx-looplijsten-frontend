import React, { MouseEvent, FC } from "react"
import { Button } from "@datapunt/asc-ui"
import styled from "styled-components"
import noop from "../../lib/utils/noop"

type Props = {
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void
}

const StyledButton = styled(Button)`
  font-weight: bold
  height: auto
`

const ClearButton: FC<Props> = ({ onClick = noop }) =>
  <StyledButton variant="textButton" onClick={ onClick}>
    Wis velden
  </StyledButton>

export default ClearButton
