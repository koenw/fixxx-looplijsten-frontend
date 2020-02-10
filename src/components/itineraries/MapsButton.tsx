import React, { FC, MouseEvent } from "react"
import styled from "styled-components"
import { Button } from "@datapunt/asc-ui"
import { Location } from "@datapunt/asc-assets"
import displayAddress from "../../lib/displayAddress"
import { mobile, desktop } from "../../responsiveness/mediaQueries"

type Props = {
  itineraries: BWVData[]
}

const StyledButton = styled(Button)`
  border: solid 1px black
`
const SpanMobile = styled.span`
  @media ${ desktop } {
    display: none
  }
`
const SpanDesktop = styled.span`
  @media ${ mobile } {
    display: none
  }
`

const MapsButton: FC<Props> = ({ itineraries }) => {
  const onClick = (event: MouseEvent) => {
    const path = itineraries
      .map(itinerary => {
        const {
          street_name: streetName,
          street_number: streetNumber,
          postal_code: postalCode
        } = itinerary
        const address = displayAddress(streetName, streetNumber)
        const city = "Amsterdam"
        return `${ address } ${ postalCode } ${ city }`
      })
      .filter((address, index, arr) => arr.indexOf(address) === index) // filter unique
      .join("/")
    const href = `https://www.google.nl/maps/dir/${ path }`
    window.open(href, "_blank")
  }
  return (
    <StyledButton onClick={ onClick } variant="blank" iconLeft={ <Location /> }>
      <SpanMobile>Maps</SpanMobile>
      <SpanDesktop>Bekijk op Google Maps</SpanDesktop>
    </StyledButton>
  )
}
export default MapsButton
