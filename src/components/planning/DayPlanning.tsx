import React, { FC, useState, ChangeEvent, FormEvent } from "react"
import styled from "styled-components"
import useGlobalState from "../../hooks/useGlobalState"
import useOnChangeState from "../../hooks/useOnChangeState"
import useOnChangeStateMultiple from "../../hooks/useOnChangeStateMultiple"
import days from "../../lib/days"
import NumberInput from "./NumberInput"
import StadiaSelect from "./StadiaSelect"
import StadiaSelectMultiple from "./StadiaSelectMultiple"
import { Button, Spinner, Select } from "@datapunt/asc-ui"
import { openingDate, openingReasons, listsDay } from "../../config/planning"
import createPlanningRequestBody from "../../lib/createPlanningRequestBody"
import ErrorMessage from "../global/ErrorMessage"

const SelectWrap = styled.div`
  width: 300px
  margin-bottom: 36px
`
const DayPartWrap = styled.div`
  margin-top: 36px
  * {
    vertical-align: top
  }
`
const Div = styled.div`
  display: flex
`
const SettingsDiv = styled.div`
  margin-left: 24px
`
const Label = styled.label`
  font-weight: bold
`
const InlineLabel = styled(Label)`
  display: inline-block
  width: 100px
`
const LabelsWrap = styled.div`
  padding-left: 100px
`
const LabelInput = styled(Label)`
  display: inline-block
  width: 80px
`
const width = "240px"
const LabelSelect = styled(Label)`
  display: inline-block
  width: ${ width }
`
const SelectsWrap = styled.div`
  display: inline-block
  width: ${ width }
  margin-right: 4px
  select {
    width: ${ width }
  }
`
const ButtonWrap = styled.div`
  display: flex
  justify-content: flex-end
  margin-top: 36px
`

const SpinnerWrap = styled.div`
  margin-right: 24px
  display: inline-block
`

const DayPlanning: FC = () => {

  const {
    planning: {
      isFetching,
      errorMessage
    },
    planningActions: {
      generate
    }
  } = useGlobalState()

  const day = (new Date()).getDay()
  const tomorrow = day + 1 > 6 ? 0 : day + 1
  const dayOfWeek = tomorrow - 1 < 0 ? 6 : tomorrow - 1 // correct sunday => 6

  const defaultPlanning = listsDay(dayOfWeek)

  const [morning, onChangeMorning] = useOnChangeState("0")
  const morningPrimaryStadiumDefault = (defaultPlanning[0] && defaultPlanning[0].primary_stadium) || ""
  const morningSecondaryStadiaDefault = (defaultPlanning[0] && defaultPlanning[0].secondary_stadia && defaultPlanning[0].secondary_stadia) || []
  const morningExcludeStadiaDefault = (defaultPlanning[0] && defaultPlanning[0].exclude_stadia && defaultPlanning[0].exclude_stadia) || []
  const [morningPrimaryStadium, onChangeMorningPrimaryStadium] = useOnChangeState(morningPrimaryStadiumDefault)
  const [morningSecondaryStadia, onChangeMorningSecondaryStadia] = useOnChangeStateMultiple(morningSecondaryStadiaDefault)
  const [morningExcludeStadia, onChangeMorningExcludeStadia] = useOnChangeStateMultiple(morningExcludeStadiaDefault)
  const [afternoon, onChangeAfternoon] = useOnChangeState("0")
  const afternoonPrimaryStadiumDefault = (defaultPlanning[1] && defaultPlanning[1].primary_stadium) || ""
  const afternoonSecondaryStadiaDefault = (defaultPlanning[1] && defaultPlanning[1].secondary_stadia && defaultPlanning[1].secondary_stadia) || []
  const afternoonExcludeStadiaDefault = (defaultPlanning[1] && defaultPlanning[1].exclude_stadia && defaultPlanning[1].exclude_stadia) || []
  const [afternoonPrimaryStadium, onChangeAfternoonPrimaryStadium] = useOnChangeState(afternoonPrimaryStadiumDefault)
  const [afternoonSecondaryStadia, onChangeAfternoonSecondaryStadia] = useOnChangeStateMultiple(afternoonSecondaryStadiaDefault)
  const [afternoonExcludeStadia, onChangeAfternoonExcludeStadia] = useOnChangeStateMultiple(afternoonExcludeStadiaDefault)
  const [evening, onChangeEvening] = useOnChangeState("0")
  const eveningPrimaryStadiumDefault = (defaultPlanning[2] && defaultPlanning[2].primary_stadium) || ""
  const eveningSecondaryStadiaDefault = (defaultPlanning[2] && defaultPlanning[2].secondary_stadia && defaultPlanning[2].secondary_stadia) || []
  const eveningExcludeStadiaDefault = (defaultPlanning[2] && defaultPlanning[2].exclude_stadia && defaultPlanning[2].exclude_stadia) || []
  const [eveningPrimaryStadium, onChangeEveningPrimaryStadium] = useOnChangeState(eveningPrimaryStadiumDefault)
  const [eveningSecondaryStadia, onChangeEveningSecondaryStadia] = useOnChangeStateMultiple(eveningSecondaryStadiaDefault)
  const [eveningExcludeStadia, onChangeEveningExcludeStadia] = useOnChangeStateMultiple(eveningExcludeStadiaDefault)

  const [dayState, setDay] = useState(dayOfWeek)
  const onChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setDay(parseInt(event.target.value, 10))
  }

  const createConfig = () => {
    const config = []
    const morningNum = parseInt(morning, 10)
    if (morningNum > 0) {
      config.push({
        number_of_lists: morningNum,
        primary_stadium: morningPrimaryStadium,
        secondary_stadia: morningSecondaryStadia.filter(item => item !== ""),
        exclude_stadia: morningExcludeStadia.filter(item => item !== "")
      })
    } else {
      config.push({ number_of_lists: 0 })
    }
    const afternoonNum = parseInt(afternoon, 10)
    if (afternoonNum > 0) {
      config.push({
        number_of_lists: afternoonNum,
        primary_stadium: afternoonPrimaryStadium,
        secondary_stadia: afternoonSecondaryStadia.filter(item => item !== ""),
        exclude_stadia: afternoonExcludeStadia.filter(item => item !== "")
      })
    } else {
      config.push({ number_of_lists: 0 })
    }
    const eveningNum = parseInt(evening, 10)
    if (eveningNum > 0) {
      config.push({
        number_of_lists: eveningNum,
        primary_stadium: eveningPrimaryStadium,
        secondary_stadia: eveningSecondaryStadia,
        exclude_stadia: eveningExcludeStadia
      })
    } else {
      config.push({ number_of_lists: 0 })
    }
    return config
  }

  const onSubmit = (event: FormEvent) => {
    event.preventDefault()
    const config = createConfig()
    const params = createPlanningRequestBody(config, dayState)
    console.log(params)
    generate(params)
  }

  const showSpinner = isFetching
  const showError = errorMessage !== undefined

  return (
    <Div className="Planning">
      <div>
        <h2>Hoeveel lijsten per dagdeel wil je genereren?</h2>
        <form onSubmit={ onSubmit }>
          <Label>Selecteer dag</Label>
          <SelectWrap>
            <Select value={ String(dayState) } onChange={ onChange }>
              { days.map(({ title }, index) => <option key={ title } value={ index }>{ title }</option>) }
            </Select>
          </SelectWrap>

          <LabelsWrap>
            <LabelInput>lijsten</LabelInput>
            <LabelSelect>Primair stadium</LabelSelect>
            <LabelSelect>Secundaire stadia</LabelSelect>
            <LabelSelect>Geëxcludeerde stadia</LabelSelect>
          </LabelsWrap>

          <DayPartWrap>
            <InlineLabel>ochtend</InlineLabel>
            <NumberInput value={ morning } onChange={ onChangeMorning } />
            <SelectsWrap>
              <StadiaSelect disabled={ morning === "0" } selected={ [morningPrimaryStadium] } onChange={ onChangeMorningPrimaryStadium } />
            </SelectsWrap>
            <SelectsWrap>
              <StadiaSelectMultiple disabled={ morning === "0" } selected={ morningSecondaryStadia } onChange={ onChangeMorningSecondaryStadia } />
            </SelectsWrap>
            <SelectsWrap>
              <StadiaSelectMultiple disabled={ morning === "0" } selected={ morningExcludeStadia } onChange={ onChangeMorningExcludeStadia } />
            </SelectsWrap>
          </DayPartWrap>
          <DayPartWrap>
            <InlineLabel>middag</InlineLabel>
            <NumberInput value={ afternoon } onChange={ onChangeAfternoon } />
            <SelectsWrap>
              <StadiaSelect disabled={ afternoon === "0" } selected={ [afternoonPrimaryStadium] } onChange={ onChangeAfternoonPrimaryStadium } />
            </SelectsWrap>
            <SelectsWrap>
              <StadiaSelectMultiple disabled={ afternoon === "0" } selected={ afternoonSecondaryStadia } onChange={ onChangeAfternoonSecondaryStadia } />
            </SelectsWrap>
            <SelectsWrap>
              <StadiaSelectMultiple disabled={ afternoon === "0" } selected={ afternoonExcludeStadia } onChange={ onChangeAfternoonExcludeStadia } />
            </SelectsWrap>
          </DayPartWrap>
          <DayPartWrap>
            <InlineLabel>avond</InlineLabel>
            <NumberInput value={ evening } onChange={ onChangeEvening } />
            <SelectsWrap>
              <StadiaSelect disabled={ evening === "0" } selected={ [eveningPrimaryStadium] } onChange={ onChangeEveningPrimaryStadium } />
            </SelectsWrap>
            <SelectsWrap>
              <StadiaSelectMultiple disabled={ evening === "0" } selected={ eveningSecondaryStadia } onChange={ onChangeEveningSecondaryStadia } />
            </SelectsWrap>
            <SelectsWrap>
              <StadiaSelectMultiple disabled={ evening === "0" } selected={ eveningExcludeStadia } onChange={ onChangeEveningExcludeStadia } />
            </SelectsWrap>
          </DayPartWrap>

          { showError &&
            <ErrorMessage text={ errorMessage! } />
          }

          <ButtonWrap>
            { showSpinner &&
              <SpinnerWrap>
                <Spinner size={ 40 } />
              </SpinnerWrap>
            }
            <Button variant="primary" disabled={ isFetching }>Genereer looplijsten</Button>
          </ButtonWrap>
        </form>
      </div>
      <SettingsDiv>
        <h2>Settings</h2>
        <Label>openings datum: </Label>
        <p>{ openingDate }</p>
        <Label>openings redenen: </Label>
        <ul>
          { openingReasons.map(reason => <li key={ reason }>{ reason }</li>) }
        </ul>
      </SettingsDiv>
    </Div>
  )
}
export default DayPlanning
