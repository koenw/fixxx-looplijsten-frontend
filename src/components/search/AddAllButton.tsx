import React, { FC, useState, MouseEvent } from "react"
import styled from "styled-components"
import { Button } from "@datapunt/asc-ui"
import { Enlarge } from "@datapunt/asc-assets"
import noop from "../../lib/utils/noop"

type Props = {
  onClick?: (a: MouseEvent<HTMLButtonElement>) => void
  disabled?: boolean
}

const StyledButton = styled(Button)`
  border: solid 1px black
`

const AddAllButton: FC<Props> = ({ onClick = noop, disabled = false }) => {

  const onClickHandler = (event: MouseEvent<HTMLButtonElement>) => {
    onClick(event)
  }

  return (
    <StyledButton
      onClick={ onClickHandler }
      variant="blank"
      iconLeft={ <Enlarge /> }
      disabled={ disabled }
    >
    Voeg alles toe aan Mijn looplijst
    </StyledButton>
  )
}
export default AddAllButton
