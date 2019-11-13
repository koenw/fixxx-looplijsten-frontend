import React from "react"
import { Link } from "@reach/router"
import useFetch from "../hooks/useFetch"
import Hr from "./Hr"

type User = {
  username: string,
  first_name: string,
  last_name: string
}
type Users = User[]
type Team = {
  id: number,
  name: string,
  members: User[]
}
type Teams = Team[]



const Teams: React.FC = () => {

  const teams: Teams = useFetch("teams", true)!

  return (
    <div className="Teams">
      { teams.map(({ id, name, members }) => (
        <article key={ id }>
          <h1><Link to={ `/teams/${ id }` }>{ name }</Link></h1>
          <p>{ members.map(member => member.first_name).join(", ") }</p>
          <Hr />
        </article>
      )) }
    </div>
  )
}
export default Teams
