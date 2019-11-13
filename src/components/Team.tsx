import React, { useState, useEffect } from "react"
import { Link } from "@reach/router"
import Signal from "./Signal"
import Hr from "./Hr"
import DateButton from "./DateButton"
import { ButtonBar } from "@datapunt/asc-ui"
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

const ButtonBarWrap = styled.div`
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
        setTeam(json)
      } catch (err) {
        console.log(err)
      }
    })()
  }, [id])

  const [teamItineraries, setTeamItineraries] = useState([])
  const [date, setDate] = useState<string>()

  console.log(date)
  if (date === undefined) {
    const today = currentDate()
    setDate(today)
  }

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
        setTeamItineraries(json)
      } catch (err) {
        console.log(err)
      }
    })()
  }, [id])

  const hasLoaded = team !== undefined && teamItineraries.length > 0 && date !== undefined
  const dates: string[] = teamItineraries ? teamItineraries.map((itinerary: any) => itinerary.date).sort() : []
  const result: any = teamItineraries.find((teamItinerary: any) => teamItinerary.date === date)
  const itineraries = result ? result.items : []

  return (
    <div className="Team">
      { hasLoaded &&
        <>
          <h1>{ team!.members.map(member => member.first_name).join(" & ") }</h1>
          <ButtonBarWrap>
            <ButtonBar>
              { dates.map(d => <DateButton key={ d } date={ d } onClick={ () => setDate(d) } active={ d === date } />) }
            </ButtonBar>
          </ButtonBarWrap>
          { itineraries.map((itinerary: Itinerary) => (
            <div key={ itinerary.address }>
              <Link to={ `/teams/${ team!.id }/cases/${ itinerary.wng_id || 1 }`}>{ itinerary.address }</Link>
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
