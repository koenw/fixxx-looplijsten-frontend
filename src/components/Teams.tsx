import React from "react"
import { Link } from "@reach/router"
import useFetch from "../hooks/useFetch"

type User = {
  username: string,
  first_name: string,
  last_name: string
}
type Users = User[]
type Team = {
  id: number,
  members: User[]
}
type Teams = Team[]

const Teams: React.FC = () => {

  const teams: Teams = useFetch("teams", true)!

  return (
    <div className="Teams">
      { teams.map(({ id, members }) => (
        <article key={ id }>
          <h1><Link to={ `/teams/${ id }` }>{ members.map(member => member.first_name).join(" & ") }</Link></h1>
        </article>
      )) }
    </div>
  )
}
export default Teams
