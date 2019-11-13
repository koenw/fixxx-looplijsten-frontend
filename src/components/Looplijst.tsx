import React, { useState, useEffect } from "react"
import { Link } from "@reach/router"
import styled from "styled-components"
import useFetch from "../hooks/useFetch"

const Ul = styled.ul`
  list-style: none
`

const Li = styled.li`
  padding-bottom: 24px
`

type Woning = {
  wng_id: number,
  url: string,
  address: string,
  postal_code_area: string,
  postal_code_street: string,
  stadium: string
}
type Woningen = Woning[]

const Looplijst: React.FC = () => {

  const items: Woningen = useFetch("itineraries", true)

  return (
    <Ul>
      { items.map(item => {
        const hasStadium = item.stadium && item.stadium !== ""
        return (
          <Li key={ item.wng_id }>
            <Link to={ `/cases/${ item.wng_id }` }>{ item.address }</Link>
            <p>{ `${ item.postal_code_area } ${ item.postal_code_street }`}</p>
            { hasStadium &&
              <p>{ item.stadium }</p>
            }
          </Li>
        )
      } ) }
    </Ul>
  )
}

export default Looplijst
