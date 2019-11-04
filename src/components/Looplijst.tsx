import React from "react"
import { Link } from "@reach/router"
import styled from "styled-components"

const Ul = styled.ul`
  list-style: none;
`

const Li = styled.li`
  padding-bottom: 4px;
`

const Looplijst: React.FC = () => {
  const items = [
    ["Damstraat 107-I 1011AC", 1],
    ["Dam 1 1000AA", 2],
    ["Weststraat 3 1012AD", 3]
  ]

  return (
    <Ul>
      { items.map(item => <Li><Link to={ `/cases/${ item[1] }` }>{ item[0] }</Link></Li>) }
    </Ul>
  )
}

export default Looplijst
