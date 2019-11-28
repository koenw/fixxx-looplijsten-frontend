import React from "react"
import { Router } from "@reach/router"
import { ThemeProvider } from "@datapunt/asc-ui"
import StateProvider from "./components/providers/StateProvider"
import styled from "styled-components"
import { getBasepath } from "./config/domain"
import HeaderWrap from "./components/global/HeaderWrap"
import CasePage from "./pages/CasePage"
import NotFoundPage from "./pages/NotFoundPage"
import LoginPage from "./pages/LoginPage"
import ItinerariesPage from "./pages/ItinerariesPage"
import SearchPage from "./pages/SearchPage"
import ParsePage from "./pages/ParsePage"

const Main = styled.main`
  margin: 15px
`

const App: React.FC = () => {
  const basepath = getBasepath()
  return (
    <StateProvider>
      <ThemeProvider>
        <div className="App">
          <HeaderWrap />
          <Main>
            <Router basepath={ basepath }>
              <ItinerariesPage path="/" />
              <SearchPage path="/zoeken" />
              <ParsePage path="/parse" />
              <CasePage path="/cases/:caseId" />
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
