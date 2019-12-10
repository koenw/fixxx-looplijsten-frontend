import React, { FC, MouseEvent } from "react"
import { Button } from "@datapunt/asc-ui"
import { Minimise } from "@datapunt/asc-assets"
import noop from "../../utils/noop"

type Props = {
  onClick?: (a: MouseEvent<HTMLButtonElement>) => void
}

const RemoveAllButton: FC<Props> = ({ onClick = noop }) => {
  const confirmText = "Weet je zeker dat je je hele looplijst wilt wissen?"
  const onClickConfirm = (event: MouseEvent<HTMLButtonElement>) => {
    if (window.confirm(confirmText)) onClick(event)
  }
  return <Button onClick={ onClickConfirm } variant="blank" iconLeft={ <Minimise /> }>Wis looplijst</Button>
}
export default RemoveAllButton
