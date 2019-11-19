import React, { FC } from "react"
import { RouteComponentProps } from "@reach/router"
import Search from "../components/Search"
import Navigation from "../components/Navigation"

type Props = RouteComponentProps

const SearchPage: FC<Props> = () => {
  return (
    <>
      <Navigation />
      <Search />
    </>
  )
}

export default SearchPage
