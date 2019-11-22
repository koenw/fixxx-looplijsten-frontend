import React from "react"
import { Header } from "@datapunt/asc-ui"
import Logout from "../auth/Logout"
import { Location } from "@reach/router"
import { to } from "../../config/domain"

const HeaderWrap: React.FC = () => {

  return (
    <Location>
    { ({ location }) => {
      const showLogout = location.pathname !== to("/login")
      const navigation = showLogout ? <Logout /> : null
      return (
        <Header
          tall={ false }
          title="Looplijsten vakantieverhuur"
          homeLink={ to("/") }
          navigation={ navigation }
        />
      )
    } }
    </Location>
  )
}

export default HeaderWrap
