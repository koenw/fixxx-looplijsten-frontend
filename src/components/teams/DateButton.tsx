import React from "react"
import { Button } from "@datapunt/asc-ui"
import formatDate from "../../utils/formatDate"

type Props = {
  date: string
  active: boolean
  onClick: () => void
}

const DateButton: React.FC<Props> = ({ date, active, onClick }) => {

  const variant = active ? "primary" : "tertiary"

  return (
    <Button variant={ variant } onClick={ onClick }>
      <time>{ formatDate(date, true) }</time>
    </Button>
  )
}

export default DateButton
