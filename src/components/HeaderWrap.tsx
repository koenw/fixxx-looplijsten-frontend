import React from "react"
import { Header } from "@datapunt/asc-ui"
import Logout from "./Logout"
import { Location } from "@reach/router"

const HeaderWrap: React.FC = () => {

  return (
    <Location>
    { ({ location }) => {
      const showLogout = location.pathname !== "/login"
      const navigation = showLogout ? <Logout /> : null
      return (
        <Header
          tall={ false }
          title="Looplijsten vakantieverhuur"
          homeLink="/"
          navigation={ navigation }
        />
      )
    } }
    </Location>
  )
}

export default HeaderWrap
