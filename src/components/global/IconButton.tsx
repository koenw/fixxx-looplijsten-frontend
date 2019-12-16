import React, { FC, MouseEvent } from "react"
import styled from "styled-components"
import { Button } from "@datapunt/asc-ui"
import { Enlarge, Minimise, TrashBin, DocumentText } from "@datapunt/asc-assets"
import noop from "../../utils/noop"

type Props = {
  icon: "Enlarge" | "Minimise" | "TrashBin" | "DocumentText"
  onClick?: (a: MouseEvent<HTMLButtonElement>) => void
  size?: number
  border?: boolean
  disabled?: boolean
}

const iconMap = {
  "Enlarge": <Enlarge />,
  "Minimise": <Minimise />,
  "TrashBin": <TrashBin />,
  "DocumentText": <DocumentText />
}

const StyledButton = styled(Button)`
  border: solid 1px black
`

const IconButton: FC<Props> = ({ icon, onClick = noop, size = 60, border = true, disabled = false }) => {
  const Component = border ? StyledButton : Button
  return <Component onClick={ onClick } size={ size } variant="blank" icon={ iconMap[icon] } disabled={ disabled } />
}

export default IconButton
