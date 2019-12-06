import React, { FC, MouseEvent } from "react"
import { Button } from "@datapunt/asc-ui"
import { Enlarge } from "@datapunt/asc-assets"

type Props = {
  onClick?: (a: MouseEvent<HTMLButtonElement>) => void
}

const AddAllButton: FC<Props> = ({ onClick }) =>
  <Button onClick={ onClick } variant="blank" iconLeft={ <Enlarge /> }>Voeg alles toe</Button>
export default AddAllButton
