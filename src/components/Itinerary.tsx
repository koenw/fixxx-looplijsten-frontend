import React, { FC } from "react"

type Props = {
  itinerary: any
}

const Itinerary: FC<Props> = ({ itinerary }) => {
  const text = itinerary.items[0].address
  return (
    <div>
      { text }
    </div>
  )
}
export default Itinerary
