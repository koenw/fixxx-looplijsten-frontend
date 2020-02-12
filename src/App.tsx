import React, { FC } from "react"
import { Router } from "@reach/router"
import { ThemeProvider } from "@datapunt/asc-ui"
import StateProvider from "./components/providers/StateProvider"
import styled from "styled-components"
import { basepath } from "./config/page"
import Anonymous from "./components/global/Anonymous"
import HeaderWrap from "./components/global/HeaderWrap"
import ItinerariesPage from "./pages/ItinerariesPage"
import SearchPage from "./pages/SearchPage"
import ParsePage from "./pages/ParsePage"
import CasePage from "./pages/CasePage"
import NotePage from "./pages/NotePage"
import PlanningPage from "./pages/PlanningPage"
import PlanningResultPage from "./pages/PlanningResultPage"
import LoginPage from "./pages/LoginPage"
import NotFoundPage from "./pages/NotFoundPage"
import LoginCallbackPage from "./pages/LoginCallbackPage"

const Main = styled.main`
  margin: 15px
  margin-top: 0
`

/* Be careful!
 * Make sure to also add the paths to `/serve.json` file
 * This is required for reloading URLs on acceptatie and production
 */

const App: FC = () => {

  return (
    <StateProvider>
      <ThemeProvider>
        <Anonymous />
        <div className="App">
          <HeaderWrap />
          <Main>
            <Router basepath={ basepath }>
              <ItinerariesPage path="/" />
              <SearchPage path="/zoeken" />
              <ParsePage path="/parse" />
              <CasePage path="/cases/:caseId" />
              <NotePage path="/notes/:itineraryId" />
              <NotePage path="/notes/:itineraryId/:id" />
              <PlanningPage path="/planning" />
              <PlanningResultPage path="/planning/result" />
              <LoginPage path="/login" />
              <LoginCallbackPage path="/authentication/callback" />
              <NotFoundPage default />
            </Router>
          </Main>
        </div>
      </ThemeProvider>
    </StateProvider>
  )
}

export default App
