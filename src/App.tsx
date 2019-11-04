import React from "react"
import styled from "styled-components"
import { Header } from "@datapunt/asc-ui"
import { Router } from "@reach/router"
import HomePage from "./pages/HomePage"
import CasePage from "./pages/CasePage"
import NotFoundPage from "./pages/NotFoundPage"

const StyledHeader = styled(Header)`
  background: white;
`

const Main = styled.main`
  margin: 12px;
  margin-bottom: 200px;
`

const App: React.FC = () => {
  return (
    <div className="App">
      <StyledHeader
        tall={false}
        title="Fixxx Looplijsten"
        homeLink="/"
      />
      <Main>
        <Router>
          <HomePage path="/" />
          <CasePage path="cases/:caseId" />
          <NotFoundPage default />
        </Router>
      </Main>
    </div>
  );
}

export default App;
