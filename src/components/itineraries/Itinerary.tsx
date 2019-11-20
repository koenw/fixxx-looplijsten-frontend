import React, { FC } from "react"
import { Link } from "@reach/router"
import Signal from "../global/Signal"
import styled from "styled-components"

type Props = {
  itinerary: any
}

const Article = styled.article`
  margin-bottom: 24px
`

const Itinerary: FC<Props> = ({ itinerary }) => {

  const { id, address, postal_code: postalCode, stadium } = itinerary
  const to = `/cases/${ id }`

  return (
    <Article className="Itinerary">
      <Link to={ to }>{ address }</Link>
      <p>{ postalCode }</p>
      <Signal text={ stadium } />
    </Article>
  )
}
export default Itinerary
