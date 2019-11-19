import React, { FC, FormEvent, Dispatch, SetStateAction } from "react"
import styled from "styled-components"
import { Button } from "@datapunt/asc-ui"
import useOnChangeState from "../hooks/useOnChangeState"
import { getUrl } from "../config/domain"
import Input from "./Input"

type Props = {
  setResults: Dispatch<SetStateAction<never[]>>
}

const InputSearchForm = styled(Input)`
  height: 44px
  margin-right: 4px
  vertical-align: top
`

const InputPostalCode = styled(InputSearchForm)`
  width: 120px
`

const InputNumber = styled(InputSearchForm)`
  width: 40px
  &::-webkit-inner-spin-button,
  &::-webkit-outer-spin-button {
    -webkit-appearance: none
    margin: 0
  }
`

const InputAddition = styled(InputSearchForm)`
  width: 40px
`

const SearchForm: FC<Props> = ({ setResults }) => {

  const [postalCode, onChangePostalCode] = useOnChangeState()
  const [streetNumber, onChangeStreetNumber] = useOnChangeState()
  const [suffix, onChangeSuffix] = useOnChangeState()
  const onSubmit = async (event: FormEvent) => {
    event.preventDefault()

    try {
      const params = { postalCode, streetNumber, suffix }
      const url = getUrl("search", params)
      const response = await fetch(url, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      })
      const json = await response.json()
      console.log(json)
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <form onSubmit={ onSubmit }>
      <InputPostalCode
        type="text"
        placeholder="postcode"
        pattern="[1-9][0-9]{3}\s?[a-zA-Z]{2}"
        title="Geldige postcodes zijn 1234AA of 1234 aa"
        required
        value={ postalCode }
        onChange={ onChangePostalCode }
        />
      <InputNumber
        type="number"
        placeholder="huisnummer"
        min="1"
        step="1"
        pattern="\d+"
        title="Alleen cijfers zijn geldig"
        required
        value={ streetNumber }
        onChange={ onChangeStreetNumber }
        />
      <InputAddition
        type="text"
        placeholder="toevoeging"
        value={ suffix }
        onChange={ onChangeSuffix }
        />
      <Button variant="primary">Zoek</Button>
    </form>
  )
}

export default SearchForm
