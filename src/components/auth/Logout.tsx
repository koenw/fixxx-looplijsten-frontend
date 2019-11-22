import React from "react"
import styled from "styled-components"
import { Button } from "@datapunt/asc-ui"
import { navigate } from "@reach/router"
import { to } from "../../config/domain"
import authToken from "../../utils/authToken"
import { Logout as LogoutIcon } from "@datapunt/asc-assets"

const Div = styled.div`
  margin-right: 8px
`

const Logout: React.FC = () => {

  const onClick = () => {
    authToken.clear()
    navigate(to("/login"))
  }

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
