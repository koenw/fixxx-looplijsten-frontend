import React, { FC, MouseEvent } from "react"
import styled from "styled-components"
import { Button } from "@datapunt/asc-ui"
import { TrashBin } from "@datapunt/asc-assets"
import noop from "../../lib/utils/noop"
import confirm from "../../lib/utils/confirm"
import { mobile, desktop } from "../../responsiveness/mediaQueries"

type Props = {
  onClick?: (a: MouseEvent<HTMLButtonElement>) => void
}

const StyledButton = styled(Button)`
  border: solid 1px black
`
const SpanMobile = styled.span`
  @media ${ desktop } {
    display: none
  }
`
const SpanDesktop = styled.span`
  @media ${ mobile } {
    display: none
  }
`

const RemoveAllButton: FC<Props> = ({ onClick = noop }) => {
  const message = "Weet je zeker dat je je hele looplijst wilt wissen?"
  const onClickConfirm = (event: MouseEvent<HTMLButtonElement>) => confirm(message, () => onClick(event))
  const text = window.innerWidth > 768 ? "Wis gehele looplijst" : "Wis looplijst"
  return (
    <StyledButton onClick={ onClickConfirm } variant="blank" iconLeft={ <TrashBin /> }>
      <SpanMobile>Wis lijst</SpanMobile>
      <SpanDesktop>Wis gehele looplijst</SpanDesktop>
    </StyledButton>
  )
}
export default RemoveAllButton
