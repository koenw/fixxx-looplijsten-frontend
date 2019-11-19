import React from "react"
import styled from "styled-components"
import { ThemeProvider } from "@datapunt/asc-ui"
import HeaderWrap from "./components/global/HeaderWrap"
import { Router } from "@reach/router"
import CasePage from "./pages/CasePage"
import NotFoundPage from "./pages/NotFoundPage"
import LoginPage from "./pages/LoginPage"
import ItinerariesPage from "./pages/ItinerariesPage"
import SearchPage from "./pages/SearchPage"

const Main = styled.main`
  margin: 12px
`

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <div className="App">
        <HeaderWrap />
        <Main>
          <Router>
            <ItinerariesPage path="/" />
            <SearchPage path="/zoeken" />
            <CasePage path="/cases/:caseId" />
            <LoginPage path="/login" />
            <NotFoundPage default />
          </Router>
        </Main>
      </div>
    </ThemeProvider>
  )
}

export default App
