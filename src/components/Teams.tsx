import React from "react"
import { Link } from "@reach/router"
import useFetch from "../hooks/useFetch"
import Hr from "./Hr"
import { Spinner } from "@datapunt/asc-ui"

const Teams: React.FC = () => {

  const [isFetching, teams] = useFetch("teams", true) as [boolean, Teams]
  const showSpinner = isFetching
  const show = !isFetching

  return (
    <div className="Teams">
      { showSpinner &&
        <Spinner size={ 60 } />
      }
      { show &&
        teams.map(({ id, name, members }) => (
          <article key={ id }>
            <h1><Link to={ `/teams/${ id }` }>{ name }</Link></h1>
            <p>{ members.map(member => member.first_name).join(", ") }</p>
            <Hr />
          </article>
        ))
      }
    </div>
  )
}
export default Teams
