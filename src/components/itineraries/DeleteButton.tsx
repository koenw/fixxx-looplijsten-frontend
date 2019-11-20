import React, { FC } from "react"
import { Button } from "@datapunt/asc-ui"
import { TrashBin } from "@datapunt/asc-assets"
import noop from "../../utils/noop"

type Props = {
  onClick?: any
}

const DeleteButton: FC<Props> = ({ onClick = noop }) => {
  return (<Button onClick={ onClick } size={ 60 } variant="blank" icon={ <TrashBin /> } />)
}
export default DeleteButton
