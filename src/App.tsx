import React from "react"
import { Router } from "@reach/router"
import { ThemeProvider } from "@datapunt/asc-ui"
import StateProvider from "./components/providers/StateProvider"
import styled from "styled-components"
import { getBasepath } from "./config/domain"
import Anonymous from "./components/global/Anonymous"
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
    <StateProvider>
      <ThemeProvider>
        <Anonymous />
        <div className="App">
          <HeaderWrap />
          <Main>
            <Router basepath={ basepath }>
              // Make sure to also add these paths to `/serve.json` file
              // This is required for reloading URLs
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
    </StateProvider>
  )
}

export default App
