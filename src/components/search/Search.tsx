import React, { FC, useState } from "react"
import SearchForm from "./SearchForm"
import SearchResults from "./SearchResults"
import { Link } from "@reach/router"
import styled from "styled-components"

const Div = styled.div`
  max-width: 768px
  margin: 12px 0
  display: flex
  justify-content: flex-end
  a {
    margin-bottom: 0
  }
`

const Search: FC = () => {
  const [results, setResults] = useState<SearchResults | undefined>()
  return (
    <div className="Search">
      <SearchForm setResults={ setResults } />
      <Div>
        <Link to="/parse">Geavanceerd</Link>
      </Div>
      <SearchResults results={ results } />
    </div>
  )
}
export default Search
