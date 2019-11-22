import React, { FC, FormEvent } from "react"
import styled from "styled-components"
import { Button } from "@datapunt/asc-ui"
import { Search } from "@datapunt/asc-assets"
import useOnChangeState from "../../hooks/useOnChangeState"
import { getUrl } from "../../config/domain"
import InputBase from "../styled/Input"
import authToken from "../../utils/authToken"

type Props = {
  setResults: SetState
}

const Form = styled.form`
  max-width: 768px
`

const Label = styled.label`
  font-weight: 500
  display: block
  margin-bottom: 2px
`

const InputWrap = styled.div`
  display: inline-block
  width: 90px
`
const Input = styled(InputBase)`
  height: 44px
  width: calc(100% - 4px)
`

const InputWrapPostalCode = styled(InputWrap)`
  width: calc(100% - 234px)
`

const InputWrapStreetNumber = styled(InputWrap)`
  input {
    &::-webkit-inner-spin-button,
    &::-webkit-outer-spin-button {
      -webkit-appearance: none
      margin: 0
    }
  }
`

const ButtonWrap = styled.div`
  vertical-align: top
  display: inline-block
`
const SearchButton = styled(Button)`
  margin-top: 24px
`

const SearchForm: FC<Props> = ({ setResults }) => {

  const [postalCode, onChangePostalCode] = useOnChangeState("1234AA")
  const [streetNumber, onChangeStreetNumber] = useOnChangeState("1")
  const [suffix, onChangeSuffix] = useOnChangeState()
  const onSubmit = async (event: FormEvent) => {
    event.preventDefault()

    try {
      const params = { postalCode, streetNumber, suffix }
      const url = getUrl("search", params)
      const token = authToken.get()
      const response = await fetch(url, {
        headers: {
          Accept: "application/json",
          Authorization: `Token ${ token }`,
          "Content-Type": "application/json"
        }
      })
      const json = await response.json()
      setResults(json)
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <Form onSubmit={ onSubmit }>
      <InputWrapPostalCode>
        <Label>postcode</Label>
        <Input
          type="text"
          pattern="[1-9][0-9]{3}\s?[a-zA-Z]{2}"
          title="Geldige postcodes zijn 1234AA of 1234 aa"
          required
          autoFocus
          value={ postalCode }
          onChange={ onChangePostalCode }
          />
      </InputWrapPostalCode>
      <InputWrapStreetNumber>
        <Label>huisnr.</Label>
        <Input
          type="number"
          min="1"
          step="1"
          pattern="\d+"
          title="Alleen cijfers zijn geldig"
          required
          value={ streetNumber }
          onChange={ onChangeStreetNumber }
          />
      </InputWrapStreetNumber>
      <InputWrap>
        <Label>hslt.&nbsp;/&nbsp;etage</Label>
        <Input
          type="text"
          value={ suffix }
          onChange={ onChangeSuffix }
          />
      </InputWrap>
      <ButtonWrap>
        <SearchButton variant="secondary" iconSize={ 24 } icon={ <Search /> } />
      </ButtonWrap>
    </Form>
  )
}

export default SearchForm
