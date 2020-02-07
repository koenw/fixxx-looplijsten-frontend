import React, { FC, FormEvent } from "react"
import styled from "styled-components"
import useGlobalState from "../../hooks/useGlobalState"
import useOnChangeState from "../../hooks/useOnChangeState"
import days from "../../text/days"
import DayInputs from "./DayInputs"
import { Button } from "@datapunt/asc-ui"
import createPlanningRequestBody from "../../lib/createPlanningRequestBody"

const DayPartWrap = styled.div`
  padding-left: 150px
  label {
    display: inline-block
    width: 70px
    padding-left: 4px
    padding-bottom: 8px
  }
`
const ButtonWrap = styled.div`
  display: flex
  justify-content: flex-end
  width: 368px
  margin-top: 36px
`


const Planning: FC = () => {

  const {
    planningActions: {
      generate
    }
  } = useGlobalState()

  type Input = [string, OnChangeHandler]
  const mondayMorning = useOnChangeState("2") as unknown as Input
  const mondayAfternoon = useOnChangeState("2") as unknown as Input
  const mondayEvening = useOnChangeState("0") as unknown as Input
  const tuesdayMorning = useOnChangeState("2") as unknown as Input
  const tuesdayAfternoon = useOnChangeState("2") as unknown as Input
  const tuesdayEvening = useOnChangeState("0") as unknown as Input
  const wednesdayMorning = useOnChangeState("2") as unknown as Input
  const wednesdayAfternoon = useOnChangeState("2") as unknown as Input
  const wednesdayEvening = useOnChangeState("0") as unknown as Input
  const thursdayMorning = useOnChangeState("2") as unknown as Input
  const thursdayAfternoon = useOnChangeState("2") as unknown as Input
  const thursdayEvening = useOnChangeState("0") as unknown as Input
  const fridayMorning = useOnChangeState("2") as unknown as Input
  const fridayAfternoon = useOnChangeState("2") as unknown as Input
  const fridayEvening = useOnChangeState("0") as unknown as Input
  const saturday = useOnChangeState("1") as unknown as Input
  const sunday = useOnChangeState("1") as unknown as Input

  const inputs = [
    { title: days[0], inputs: [mondayMorning, mondayAfternoon, mondayEvening] },
    { title: days[1], inputs: [tuesdayMorning, tuesdayAfternoon, tuesdayEvening] },
    { title: days[2], inputs: [wednesdayMorning, wednesdayAfternoon, wednesdayEvening] },
    { title: days[3], inputs: [thursdayMorning, thursdayAfternoon, thursdayEvening] },
    { title: days[4], inputs: [fridayMorning, fridayAfternoon, fridayEvening] },
    { title: days[5], inputs: [saturday] },
    { title: days[6], inputs: [sunday] }
  ]

  const onSubmit = (event: FormEvent) => {
    event.preventDefault()
    const inputsNums = inputs.map(({ title, inputs }) => ({ title, inputs: inputs.map(input => parseInt(input[0], 10)) }))
    const params = createPlanningRequestBody(inputsNums)
    generate(params)
  }

  return (
    <div className="Planning">
      <form onSubmit={ onSubmit }>
        <DayPartWrap>
          <label>ochtend</label>
          <label>middag</label>
          <label>avond</label>
        </DayPartWrap>
        { inputs.map(({ title, inputs }) => <DayInputs key={ title } title={ title } inputs={ inputs } />) }
        <ButtonWrap>
          <Button>Generate</Button>
        </ButtonWrap>
      </form>
    </div>
  )
}
export default Planning
