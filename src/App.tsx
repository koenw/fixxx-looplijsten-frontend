import React from "react"
import { Router } from "@reach/router"
import { ThemeProvider } from "@datapunt/asc-ui"
import styled from "styled-components"
import { getBasepath } from "./config/domain"
import HeaderWrap from "./components/global/HeaderWrap"
import ItinerariesPage from "./pages/ItinerariesPage"
import SearchPage from "./pages/SearchPage"
import ParsePage from "./pages/ParsePage"
import CasePage from "./pages/CasePage"
import NotePage from "./pages/NotePage"
import LoginPage from "./pages/LoginPage"
import NotFoundPage from "./pages/NotFoundPage"

const Main = styled.main`
  margin: 15px
`

const App: React.FC = () => {
  const basepath = getBasepath()
  return (
    <ThemeProvider>
      <div className="App">
        <HeaderWrap />
        <Main>
          <Router basepath={ basepath }>
            <ItinerariesPage path="/" />
            <SearchPage path="/zoeken" />
            <ParsePage path="/parse" />
            <CasePage path="/cases/:caseId" />
            <NotePage path="/notes/:itineraryId" />
            <LoginPage path="/login" />
            <NotFoundPage default />
          </Router>
        </Main>
      </div>
    </ThemeProvider>
  )
}

export default App
