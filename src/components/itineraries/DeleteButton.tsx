import React, { FC } from "react"
import { Button } from "@datapunt/asc-ui"
import { TrashBin } from "@datapunt/asc-assets"
import noop from "../../utils/noop"

type Props = {
  onClick?: any
}

const DeleteButton: FC<Props> = ({ onClick = noop }) => {
  const confirmText = "Weet je zeker dat je deze case wilt verwijderen?"
  const onClickConfirm = () => {
    if (window.confirm(confirmText)) onClick()
  }
  return (<Button onClick={ onClickConfirm } size={ 60 } variant="blank" icon={ <TrashBin /> } />)
}
export default DeleteButton
