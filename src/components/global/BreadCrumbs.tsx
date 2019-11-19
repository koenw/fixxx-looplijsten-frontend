import React from "react"
import { Link } from "@reach/router"
import styled from "styled-components"

type Crumb = {
  text: string,
  path?: string
}
type Crumbs = Crumb[]

type Props = {
  items: Crumbs
}

const Div = styled.div`
  margin-top: 4px
  margin-bottom: 12px
`
const Span = styled.span`
  margin-right: 8px
  &::before {
    content: "›";
    padding-right: 8px;
  }
  &:first-child {
    &::before {
      content: "";
      padding-right: 0;
    }
  }
  a {
    color: black
    text-decoration: underline
  }
`

const BreadCrumbs: React.FC<Props> = ({ items }) => {
  const children = items.map(({ text, path }) => (<Span key={ text }>{ path ? <Link to={ path }>{ text }</Link> : text }</Span>))
  return (
    <Div className="BreadCrumbs">
      { children }
    </Div>
  )
}

export default BreadCrumbs
