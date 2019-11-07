import React, { useState, useEffect } from "react"
import { Link } from "@reach/router"
import styled from "styled-components"
import { getUrl } from "../config/domain"
import authToken from "../config/authToken.json"

const Ul = styled.ul`
  list-style: none;
`

const Li = styled.li`
  padding-bottom: 24px;
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

  const [items, setItems] = useState<Woningen>([])

  useEffect(() => {
    (async () => {
      try {
        const url = getUrl("itineraries/")
        const response = await fetch(url, {
          headers: {
            "Authorization": `Token ${ authToken }`
          }
        })
        const json = await response.json()
        setItems(json.results[0].items)
      } catch (err) {
        console.error(err)
      }
    })()
  }, [])

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
