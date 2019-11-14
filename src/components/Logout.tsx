import React from "react"
import styled from "styled-components"
import { Button } from "@datapunt/asc-ui"
import { navigate } from "@reach/router"

const Div = styled.div`
  margin-right: 8px;
`
type Props = {}

const Logout: React.FC<Props> = () => {
  return (
    <Div className="Logout">
      <Button variant="textButton" onClick={() => {
        localStorage.setItem('token', '');
        navigate('/login');
      }}>
        Logout
      </Button>
    </Div>
  )
}

export default Logout
