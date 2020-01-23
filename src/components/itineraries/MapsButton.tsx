import React, { FC, MouseEvent } from "react"
import styled from "styled-components"
import { Button } from "@datapunt/asc-ui"
import { Location } from "@datapunt/asc-assets"
import displayAddress from "../../lib/displayAddress"

type Props = {
  itineraries: Itineraries
}

const StyledButton = styled(Button)`
  border: solid 1px black
`

const MapsButton: FC<Props> = ({ itineraries }) => {
  const onClick = (event: MouseEvent) => {
    const path = itineraries
      .map(itinerary => {
        const {
          case: {
            bwv_data: {
              street_name: streetName,
              street_number: streetNumber,
              postal_code: postalCode
            }
          }
        } = itinerary
        const address = displayAddress(streetName, streetNumber)
        const city = "Amsterdam"
        return `${ address } ${ postalCode } ${ city }`
      })
      .filter((address, index, arr) => arr.indexOf(address) === index) // filter unique
      .join("/")
    const href = `https://www.google.nl/maps/dir/${ path }`
    console.log(href)
    window.open(href, "_blank")
  }
  const text = window.innerWidth > 768 ? "Bekijk op Google Maps" : "Google Maps"
  return <StyledButton onClick={ onClick } variant="blank" iconLeft={ <Location /> }>{ text }</StyledButton>
}
export default MapsButton
