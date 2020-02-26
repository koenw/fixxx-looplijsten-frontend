import React, { FC } from "react"
//import { Select } from "@datapunt/asc-ui"
import noop from "../../lib/utils/noop"

type Props = {
  multiple?: boolean
  selected?: Stadia
  disabled?: boolean
  onChange?: OnChangeHandler
}

const StadiaSelect: FC<Props> = ({ multiple = false, selected = [], disabled = false, onChange = noop }) => {

  const stadia = [
    "2de Controle",
    "2de hercontrole",
    "3de Controle",
    "3de hercontrole",
    "Avondronde",
    "Hercontrole",
    "Onderzoek advertentie",
    "Onderzoek buitendienst",
    "Weekend buitendienstonderzoek"
  ]

  const value = multiple ? selected : (selected[0] || "")

  return (
    <select value={ value } multiple={ multiple } disabled={ disabled } onChange={ onChange }>
      <option value="">-</option>
      { stadia.map(stadium => <option key={ stadium } value={ stadium }>{ stadium }</option>) }
    </select>
  )
}
export default StadiaSelect
