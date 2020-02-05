import React, { FC } from "react"
import { RouteComponentProps } from "@reach/router"
import Itineraries from "../components/itineraries/Itineraries"
import Navigation from "../components/global/Navigation"

const ItinerariesPage: FC<RouteComponentProps> = () => {
  return (
    <>
      <Navigation />
      <Itineraries />
    </>
  )
}
export default ItinerariesPage
