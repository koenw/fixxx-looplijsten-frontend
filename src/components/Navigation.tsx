import React, { FC } from "react"
import { Link } from "@reach/router"

const Navigation: FC = () => {
  return (
    <nav>
      <ul>
        <li><Link to="/">Mijn looplijst</Link></li>
        <li><Link to="/zoeken">Zoeken</Link></li>
      </ul>
    </nav>
  )
}
export default Navigation
