import React from "react"
import Signal from "./Signal"
import Label from "./Label"
import styled from "styled-components"

type Props = {
  address: string
  postalCode: string
  personCount: number
  signal?: "ISSUE" | "REGULAR"
  footer?: {
    title: string
    link: string
  }
}

const P = styled.p`
  margin-bottom: 8px;
`

const CaseDetailHeader: React.FC<Props> = ({ address, postalCode, personCount, footer, signal = "REGULAR" }) => {
  const showFooter = footer !== undefined
  return (
    <header>
      <h1>{ address }</h1>
      <P>{ postalCode }</P>
      <Signal type={ signal } />
      <div>
        <Label>Ingeschreven</Label><span>{ personCount } personen</span>
      </div>
      { showFooter &&
        <a href={ footer!.link }>{ footer!.title }</a>
      }
    </header>
  )
}

export default CaseDetailHeader
