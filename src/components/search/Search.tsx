import React, { FC, useState } from "react"
import SearchForm from "./SearchForm"
import SearchResults from "./SearchResults"

const Search: FC = () => {
  const [results, setResults] = useState<SearchResults | undefined>()
  return (
    <div className="Search">
      <SearchForm setResults={ setResults } />
      <SearchResults results={ results } />
    </div>
  )
}
export default Search
