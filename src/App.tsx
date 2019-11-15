import React from "react"
import styled from "styled-components"
import { ThemeProvider } from "@datapunt/asc-ui"
import HeaderWrap from "./components/HeaderWrap"
import { Router } from "@reach/router"
import TeamsPage from "./pages/TeamsPage"
import TeamPage from "./pages/TeamPage"
import CasePage from "./pages/CasePage"
import NotFoundPage from "./pages/NotFoundPage"
import LoginPage from "./pages/LoginPage"

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
            <TeamsPage path="/" />
            <TeamsPage path="/teams" />
            <TeamPage path="/teams/:teamId" />
            <CasePage path="/teams/:teamId/cases/:caseId" />
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
