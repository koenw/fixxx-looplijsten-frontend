import React, { FC, FormEvent, useContext, useEffect } from "react"
import styled from "styled-components"
import { Button } from "@datapunt/asc-ui"
import { Search } from "@datapunt/asc-assets"
import useOnChangeState from "../../hooks/useOnChangeState"
import { getUrl } from "../../config/domain"
import InputBase from "../styled/Input"
import authToken from "../../utils/authToken"
import stateContext from "../../contexts/StateContext"

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

const get = async (postalCode: string, streetNumber: string, suffix: string) => {

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
    return await response.json()
  } catch (err) {
    console.error(err)
  }
}

const SearchForm: FC<Props> = ({ setResults }) => {

  const {
    state: {
      search: {
        postalCode: postalCodeState,
        streetNumber: streetNumberState,
        suffix: suffixState
      },
      setSearch
    }
  } = useContext(stateContext)

  const [postalCode, onChangePostalCode] = useOnChangeState(postalCodeState)
  const [streetNumber, onChangeStreetNumber] = useOnChangeState(streetNumberState)
  const [suffix, onChangeSuffix] = useOnChangeState(suffixState)

  const search = async () => {
    if (postalCode === "" || streetNumber === "") return
    const json = await get(postalCode.replace(/\s/g, ""), streetNumber, suffix)
    if (json) setResults([{ success: true, data: json }])
  }

  useEffect(() => {
    search()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps


  const onSubmit = async (event: FormEvent) => {
    event.preventDefault()
    setSearch(postalCode, streetNumber, suffix)
    search()
  }

  return (
    <Form onSubmit={ onSubmit }>
      <InputWrapPostalCode>
        <Label>postcode</Label>
        <Input
          type="text"
          pattern="\s*[1-9][0-9]{3}\s?[a-zA-Z]{2}\s*"
          title="Geldige postcodes zijn in de 1234AA of 1234 aa"
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
