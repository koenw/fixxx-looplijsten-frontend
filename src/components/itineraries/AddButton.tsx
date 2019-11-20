import React, { FC } from "react"
import { Button } from "@datapunt/asc-ui"
import { Checkmark } from "@datapunt/asc-assets"

const AddButton: FC = () => {
  return (<Button size={ 60 } variant="blank" icon={ <Checkmark /> } />)
}
export default AddButton
