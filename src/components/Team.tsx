import React, { useState } from "react"
import { Link } from "@reach/router"
import styled from "styled-components"
import useFetch from "../hooks/useFetch"
import { ButtonBar } from "@datapunt/asc-ui"
import Signal from "./Signal"
import Hr from "./Hr"
import DateButton from "./DateButton"

type User = {
  username: string
  first_name: string
  last_name: string
}
type Users = User[]
type Team = {
  id: number
  name: string
  members: User[]
}
type OptionalTeam = Team | undefined
type Teams = Team[]

type Itinerary = {
  id: string
  wng_id: string
  stadium: string
  address: string
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

const H1 = styled.h1`
  font-size: 24px
  margin-top: 24px
`
const P = styled.p`
  margin-bottom: 24px
`

const ButtonBarWrap = styled.div`
  margin-bottom: 36px
`

const Team: React.FC<Props> = ({ id }) => {

  const team: OptionalTeam = useFetch(`teams/${ id }`)
  const teamItineraries = useFetch(`team-itineraries/${ id }`, true)

  const [date, setDate] = useState<string>()

  if (date === undefined) {
    const today = currentDate()
    setDate(today)
  }

  const hasLoaded = team !== undefined && teamItineraries.length > 0 && date !== undefined
  const dates: string[] = teamItineraries ? teamItineraries.map((itinerary: any) => itinerary.date).sort() : []
  const result: any = teamItineraries.find((teamItinerary: any) => teamItinerary.date === date)
  const itineraries = result ? result.items : []

  return (
    <div className="Team">
      { hasLoaded &&
        <>
          <H1>{ team!.name }</H1>
          <P>{ team!.members.map(member => member.first_name).join(", ") }</P>
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
