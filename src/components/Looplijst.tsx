import React, { useState, useEffect } from "react"
import { Link } from "@reach/router"
import styled from "styled-components"

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
        const url = "http://localhost:3000/itineraries.json"
        const response = await fetch(url)
        /*
        const url = "http://localhost:8000/api/v1/itineraries/"
        const response = await fetch(url, {
          headers: {
            "Authorization": "Token 8fff9865c2de6970e0586d6e0eb648c736f88e76",
          }
        })
        */

        const json = await response.json()
        setItems(json.results[0].items)
      } catch (err) {
        console.log(err)
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
