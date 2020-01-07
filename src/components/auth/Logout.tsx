import React, { FC, useContext } from "react"
import styled from "styled-components"
import { Button } from "@datapunt/asc-ui"
import { Logout as LogoutIcon } from "@datapunt/asc-assets"
import stateContext from "../../contexts/StateContext"

const Div = styled.div`
  margin-right: 8px
`

const Logout: FC = () => {

  const {
    state: {
      clear
    }
  } = useContext(stateContext)

  const onClick = () => clear()

  return (
    <Div className="Logout">
      <Button
        variant="blank"
        iconLeft={ <LogoutIcon /> }
        onClick={ onClick }
        >Uitloggen</Button>
    </Div>
  )
}

export default Logout
