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

const Header = styled.section`
  border: 1px solid #B4B4B4
  margin-bottom: 24px
  padding: 8px
`

const H1 = styled.h1`
  font-size: 32px
  margin: 8px 0
`

const P = styled.p`
  margin-bottom: 8px
`

const Footer = styled.footer`
  border-top: 1px solid #B4B4B4
  margin: 0 -8px
  padding: 12px 0 4px
  text-align: center
`

const CaseDetailHeader: React.FC<Props> = ({ address, postalCode, personCount, footer, signal = "REGULAR" }) => {
  const showFooter = footer !== undefined
  const personText =
    personCount === 0 ? "-" :
    personCount === 1 ? "1 persoon" :
    `${ personCount } personen`

  return (
    <Header>
      <H1>{ address }</H1>
      <P>{ postalCode }</P>
      <Signal type={ signal } />
      <div>
        <Label>Ingeschreven</Label><span><a href="#personen">{ personText }</a></span>
      </div>
      { showFooter &&
        <Footer>
          <a href={ footer!.link }>{ footer!.title }</a>
        </Footer>
      }
    </Header>
  )
}

export default CaseDetailHeader
