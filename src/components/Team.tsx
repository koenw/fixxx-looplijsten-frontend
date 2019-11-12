import React, { useState, useEffect } from "react"
import { Link } from "@reach/router"
import Signal from "./Signal"
import Hr from "./Hr"
import styled from "styled-components"
import { getUrl } from "../config/domain"
import authToken from "../config/authToken.json"

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

type Itinerary = {
  id: string,
  wng_id: string,
  stadium: string,
  address: string,
  postal_code_area: string
  postal_code_street: string
}
type Itineraries = Itinerary[]

type Props = {
  id: number
}

const currentDate = () => {
  const date = new Date()
  return `${ date.getFullYear() }-${ date.getMonth() + 1 }-${ date.getDate() }`
}

const Time = styled.time`
  display: block
  margin-bottom: 12px
`

const Team: React.FC<Props> = ({ id }) => {

  const [team, setTeam] = useState<Team>()

  useEffect(() => {
    (async () => {
      try {
        const url = getUrl(`teams/${ id }/`)
        const response = await fetch(url, {
          headers: {
            "Authorization": `Token ${ authToken }`
          }
        })
        const json = await response.json()
        console.log(json)
        setTeam(json)
      } catch (err) {
        console.log(err)
      }
    })()
  }, [])

  const [itineraries, setItineraries] = useState([])
  const [date, setDate] = useState<string>()

  useEffect(() => {
    (async () => {
      try {
        const url = getUrl(`team-itineraries/${ id }/`)
        const response = await fetch(url, {
          headers: {
            "Authorization": `Token ${ authToken }`
          }
        })
        const json = await response.json()
        const today = currentDate()
        const jsonToday = json.find((item: any) => item.date === today)
        if (jsonToday) {
          setItineraries(jsonToday.items)
          setDate(jsonToday.date)
        }
      } catch (err) {
        console.log(err)
      }
    })()
  }, [])

  console.log(team, itineraries, date)

  const hasLoaded = team !== undefined && itineraries.length > 0 && date !== undefined

  return (
    <div className="Team">
      { hasLoaded &&
        <>
          <h1>Team { team!.id }</h1>
          <h2>{ team!.members.map(member => member.first_name).join(" & ") }</h2>
          <Time>{ date }</Time>
          { itineraries.map((itinerary: Itinerary) => (
            <div key={ itinerary.address }>
              <Link to={ `/cases/${ itinerary.wng_id || 1 }`}>{ itinerary.address }</Link>
              <p>{ itinerary.postal_code_area }{ itinerary.postal_code_street }</p>
              <div>
                <Signal text={ itinerary.stadium } />
              </div>
              <Hr />
            </div>
          )) }
        </>
      }
    </div>
  )
}
export default Team
