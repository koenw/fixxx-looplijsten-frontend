import React from "react"
import { RouteComponentProps } from "@reach/router"
import Itineraries from "../components/Itineraries"
import Navigation from "../components/Navigation"

const ItinerariesPage: React.FC<RouteComponentProps> = () => {
  return (
    <>
      <Navigation />
      <Itineraries />
    </>
  )
}
export default ItinerariesPage
