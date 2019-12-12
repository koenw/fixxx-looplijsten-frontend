import React, { FC, useState, MouseEvent } from "react"
import { Button } from "@datapunt/asc-ui"
import { Enlarge } from "@datapunt/asc-assets"
import noop from "../../utils/noop"

type Props = {
  onClick?: (a: MouseEvent<HTMLButtonElement>) => void
}

const AddAllButton: FC<Props> = ({ onClick = noop }) => {

  const [isDisabled, setIsDisabled] = useState(false)
  const disable = () => setIsDisabled(true)

  const onClickHandler = (event: MouseEvent<HTMLButtonElement>) => {
    disable()
    onClick(event)
  }

  return (
    <Button
      onClick={ onClickHandler }
      variant="blank"
      iconLeft={ <Enlarge /> }
      disabled={ isDisabled }
    >
    Voeg alles toe aan Mijn looplijst
    </Button>
  )
}
export default AddAllButton
