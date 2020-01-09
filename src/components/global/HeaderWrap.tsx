import React from "react"
import { Header } from "@datapunt/asc-ui"
import Logout from "../auth/Logout"
import { Location } from "@reach/router"
import { to } from "../../config/domain"
import styled from "styled-components"

const Wrap = styled.div`
  position: fixed
  top: 0
  width: 100%
  z-index: 9999
`

const HeaderWrap: React.FC = () => {

  return (
    <Location>
    { ({ location }) => {
      const pathnames = [to("/login", false), to("/authentication/callback", false)]
      const showLogout = !pathnames.includes(`${ location.pathname }`)
      const navigation = showLogout ? <Logout /> : null
      return (
        <Wrap>
          <Header
            tall={ false }
            title="Toezicht op pad"
            homeLink={ to("/") }
            navigation={ navigation }
          />
        </Wrap>
      )
    } }
    </Location>
  )
}

export default HeaderWrap
