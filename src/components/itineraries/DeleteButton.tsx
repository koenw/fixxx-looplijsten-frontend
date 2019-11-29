import React, { FC, MouseEvent } from "react"
import { Button } from "@datapunt/asc-ui"
import { TrashBin } from "@datapunt/asc-assets"
import noop from "../../utils/noop"

type Props = {
  onClick?: (a: MouseEvent<HTMLButtonElement>) => void
}

const DeleteButton: FC<Props> = ({ onClick = noop }) => {
  const confirmText = "Weet je zeker dat je dit adres wilt verwijderen?"
  const onClickConfirm = (event: MouseEvent<HTMLButtonElement>) => {
    if (window.confirm(confirmText)) onClick(event)
  }
  return (<Button onClick={ onClickConfirm } size={ 60 } variant="blank" icon={ <TrashBin /> } />)
}
export default DeleteButton
