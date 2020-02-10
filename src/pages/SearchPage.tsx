import React, { FC } from "react"
import { RouteComponentProps } from "@reach/router"
<<<<<<< HEAD:src/pages/SearchPage.tsx
import Search from "../components/search/Search"
import Navigation from "../components/global/Navigation"
=======
import NavigationPlanning from "../components/global/NavigationPlanning"
import Planning from "../components/planning/Planning"
>>>>>>> Navigation planning:src/pages/PlanningPage.tsx

type Props = RouteComponentProps

const SearchPage: FC<Props> = () => {
  return (
    <>
<<<<<<< HEAD:src/pages/SearchPage.tsx
      <Navigation />
      <Search />
=======
      <NavigationPlanning />
      <Planning />
>>>>>>> Navigation planning:src/pages/PlanningPage.tsx
    </>
  )
}

export default SearchPage
