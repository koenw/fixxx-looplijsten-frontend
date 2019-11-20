import React, { FC } from "react"
import { Button } from "@datapunt/asc-ui"
import { Checkmark } from "@datapunt/asc-assets"
import noop from "../../utils/noop"

type Props = {
  onClick?: any
}

const AddButton: FC<Props> = ({ onClick = noop }) => {
  return (<Button onClick={ onClick } size={ 60 } variant="blank" icon={ <Checkmark /> } />)
}
export default AddButton
