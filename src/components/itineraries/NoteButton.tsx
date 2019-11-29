import React, { FC, MouseEvent } from "react"
import { Button } from "@datapunt/asc-ui"
import { DocumentText } from "@datapunt/asc-assets"
import noop from "../../utils/noop"

type Props = {
  onClick?: (a: MouseEvent<HTMLButtonElement>) => void
  disabled?: boolean
}

const NoteButton: FC<Props> = ({ onClick = noop, disabled = false }) => {
  return (<Button onClick={ onClick } size={ 60 } variant="blank" icon={ <DocumentText /> } disabled={ disabled } />)
}
export default NoteButton
