import React from "react"
import styled from "styled-components"
import { Button } from "@datapunt/asc-ui"
import { navigate } from "@reach/router"
import authToken from "../utils/authToken"

const Div = styled.div`
  margin-right: 8px
`
type Props = {}

const Logout: React.FC<Props> = () => {

  const onClick = () => {
    authToken.clear()
    navigate('/login')
  }

  return (
    <Div className="Logout">
      <Button variant="textButton" onClick={ onClick }>Logout</Button>
    </Div>
  )
}

export default Logout
