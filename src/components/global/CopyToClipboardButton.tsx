import React, { FC, useRef, useState } from "react"
import { Button } from "@datapunt/asc-ui"
import styled from "styled-components"
import noop from "../../lib/utils/noop"

type Props = {
  text: string
  onClick?: () => void
}

const TextArea = styled.textarea`
  position: absolute
  top: -9999px
`

const CopyToClipboardButton: FC<Props> = ({ text, onClick = noop }) => {

  const ref = useRef<HTMLTextAreaElement>(null)

  const onClickWrapped = () => {
    const textarea = ref.current
    if (textarea === null) return
    textarea.value = text
    textarea.select()
    document.execCommand("copy")
    onClick()
  }

  return <>
    <Button onClick={ onClickWrapped }>Kopieër naar clipboard</Button>
    <TextArea ref={ ref } />
  </>
}

export default CopyToClipboardButton
