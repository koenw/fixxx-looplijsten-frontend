import React, { FC } from "react"
import { RouteComponentProps } from "@reach/router"
<<<<<<< HEAD:src/pages/ParsePage.tsx
import Navigation from "../components/global/Navigation"
import ParseForm from "../components/search/ParseForm"
=======
import NavigationPlanning from "../components/global/NavigationPlanning"
import PlanningResult from "../components/planning/PlanningResult"
>>>>>>> Navigation planning:src/pages/PlanningResultPage.tsx

type Props = RouteComponentProps

const ParsePage: FC<Props> = () => {
  return (
    <>
<<<<<<< HEAD:src/pages/ParsePage.tsx
      <Navigation />
      <ParseForm />
=======
      <NavigationPlanning />
      <PlanningResult />
>>>>>>> Navigation planning:src/pages/PlanningResultPage.tsx
    </>
  )
}

export default ParsePage
