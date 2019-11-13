import React from "react"
import { Button } from "@datapunt/asc-ui"

type Props = {
  date: string
  active: boolean
  onClick: () => void
}

const DateButton: React.FC<Props> = ({ date, active, onClick }) => {

  const variant = active ? "primary" : "tertiary"

  return (
    <Button variant={ variant } onClick={ onClick }>
      <time>{ date }</time>
    </Button>
  )
}

export default DateButton
