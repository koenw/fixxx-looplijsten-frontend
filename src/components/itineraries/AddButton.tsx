import React, { FC, MouseEvent } from "react"
import styled from "styled-components"
import { Button } from "@datapunt/asc-ui"
import { Enlarge } from "@datapunt/asc-assets"
import noop from "../../utils/noop"

type Props = {
  onClick?: (a: MouseEvent<HTMLButtonElement>) => void
  disabled: boolean
}

const StyledButton = styled(Button)`
  border: solid 1px black
`

const AddButton: FC<Props> = ({ onClick = noop, disabled = false }) => {
  return (<StyledButton onClick={ onClick } size={ 60 } variant="blank" icon={ <Enlarge /> } disabled={ disabled } />)
}
export default AddButton
