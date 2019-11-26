import React, { FC } from "react"
import { Button } from "@datapunt/asc-ui"
import { DocumentText } from "@datapunt/asc-assets"
import noop from "../../utils/noop"

type Props = {
  onClick?: any
  disabled?: boolean
}

const NoteButton: FC<Props> = ({ onClick = noop, disabled = false }) => {
  return (<Button onClick={ onClick } size={ 60 } variant="blank" icon={ <DocumentText /> } disabled={ disabled } />)
}
export default NoteButton
