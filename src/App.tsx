import React from "react"
import styled from "styled-components"
import { Header } from "@datapunt/asc-ui"
import CaseDetail from "./components/CaseDetail"

const StyledHeader = styled(Header)`
  background: white;
`

const App: React.FC = () => {
  return (
    <div className="App">
      <StyledHeader
        tall={false}
        title="Fixxx Looplijsten"
        homeLink="/"
      />
      <main>
        <CaseDetail />
      </main>
    </div>
  );
}

export default App;
