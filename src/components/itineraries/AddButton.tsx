import React, { FC } from "react"
import { Button } from "@datapunt/asc-ui"
import { Enlarge } from "@datapunt/asc-assets"
import noop from "../../utils/noop"

type Props = {
  onClick?: any
}

const AddButton: FC<Props> = ({ onClick = noop }) => {
  return (<Button onClick={ onClick } size={ 60 } variant="blank" icon={ <Enlarge /> } />)
}
export default AddButton
