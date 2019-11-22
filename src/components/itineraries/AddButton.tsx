import React, { FC } from "react"
import { Button } from "@datapunt/asc-ui"
import { Enlarge } from "@datapunt/asc-assets"
import noop from "../../utils/noop"

type Props = {
  onClick?: any
  disabled: boolean
}

const AddButton: FC<Props> = ({ onClick = noop, disabled = false }) => {
  return (<Button onClick={ onClick } size={ 60 } variant="blank" icon={ <Enlarge /> } disabled={ disabled } />)
}
export default AddButton
