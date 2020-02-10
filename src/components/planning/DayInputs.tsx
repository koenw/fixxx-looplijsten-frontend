import React, { FC } from "react"
import styled from "styled-components"
import Input from "../styled/Input"

type Input = [string, OnChangeHandler]
type Inputs = Input[]
type Props = {
  title: string
  inputs: Inputs
}

const Div = styled.div`
  margin-bottom: 12px
`

const Label = styled.label`
  display: inline-block
  width: 150px
`

const StyledInput = styled(Input)`
  margin-right: 4px
  width: 70px
`

const DayInputs: FC<Props> = ({ title, inputs }) => {

  return (
    <Div className="DayInputs">
      <Label>{ title }</Label>
      {
        inputs.map((input, index) => {
          const [value, onChange] = input
          return <StyledInput key={ index } type="number" value={ value } onChange={ onChange } min="0" step="1" />
        })
      }
    </Div>
  )
}
export default DayInputs
