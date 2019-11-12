import React, { useState, useEffect } from "react"
import { getUrl } from "../config/domain"
import authToken from "../config/authToken.json"
import { Link } from "@reach/router"

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

type Props = {}

const Teams: React.FC<Props> = () => {

  const [teams, setTeams] = useState<Teams>([])

  useEffect(() => {
    (async () => {
      try {
        const url = getUrl("teams/")
        const response = await fetch(url, {
          headers: {
            "Authorization": `Token ${ authToken }`
          }
        })
        const json = await response.json()
        setTeams(json)
      } catch (err) {
        console.log(err)
      }
    })()
  }, [])

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