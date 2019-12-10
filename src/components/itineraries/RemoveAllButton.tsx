import React, { FC, MouseEvent } from "react"
import { Button } from "@datapunt/asc-ui"
import { TrashBin } from "@datapunt/asc-assets"
import noop from "../../utils/noop"

type Props = {
  onClick?: (a: MouseEvent<HTMLButtonElement>) => void
}

const RemoveAllButton: FC<Props> = ({ onClick = noop }) => {
  const confirmText = "Weet je zeker dat je je hele looplijst wilt wissen?"
  const onClickConfirm = (event: MouseEvent<HTMLButtonElement>) => {
    if (window.confirm(confirmText)) onClick(event)
  }
  return <Button onClick={ onClickConfirm } variant="blank" iconLeft={ <TrashBin /> }>Wis gehele looplijst</Button>
}
export default RemoveAllButton
