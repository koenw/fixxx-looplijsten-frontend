import React, { FC, MouseEvent } from "react"
import styled from "styled-components"
import { Button } from "@datapunt/asc-ui"
import { Location } from "@datapunt/asc-assets"
import displayAddress from "../../lib/displayAddress"
import { mobile, desktop } from "../../responsiveness/mediaQueries"

type Props = {
  $as?: "a" | "button"
  itineraries: BWVData[]
}

const StyledButton = styled(Button)`
  ${ ({ $as }) => $as !== "a" ? "border: solid 1px black;" : "" }
  ${ ({ $as }) => $as === "a" ? "margin-bottom: 0;" : "" }
  ${ ({ $as }) => $as === "a" ? "padding: 0;" : "" }
  ${ ({ $as }) => $as === "a" ? "&:hover { background-color: transparent; };" : "" }
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

const MapsButton: FC<Props> = ({ $as = "button", itineraries }) => {
  const onClick = (event: MouseEvent) => {
    event.preventDefault()
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
    <StyledButton $as={ $as } onClick={ onClick } variant="blank" iconLeft={ $as !== "a" ? <Location /> : null }>
      <SpanMobile>Maps</SpanMobile>
      <SpanDesktop>Bekijk op Google Maps</SpanDesktop>
    </StyledButton>
  )
}
export default MapsButton
