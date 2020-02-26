import React, { FC } from "react"
import styled from "styled-components"
import Input from "../styled/Input"

type Props = {
  value?: string
  onChange: OnChangeHandler
}

const StyledInput = styled(Input)`
  margin-right: 4px
  width: 70px
`

const NumberInput: FC<Props> = ({ value = "0", onChange }) => {
  return <StyledInput type="number" value={ value } onChange={ onChange } min="0" step="1" />
}
export default NumberInput
