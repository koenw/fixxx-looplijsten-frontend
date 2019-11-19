import React, { FC, useState } from "react"
import SearchForm from "./SearchForm"
import SearchResults from "./SearchResults"

const Search: FC = () => {
  const [results, setResults] = useState([])
  return (
    <div className="Search">
      <SearchForm setResults={ setResults } />
      <SearchResults results={ results } />
    </div>
  )
}
export default Search
