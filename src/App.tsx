import React from "react"
import { Header } from "@datapunt/asc-ui"
import CaseDetail from "./components/CaseDetail"

const App: React.FC = () => {
  return (
    <div className="App">
      <Header
        tall={false}
        title="Fixxx Looplijsten"
        homeLink="/"
      />
    </div>
  );
}

export default App;
