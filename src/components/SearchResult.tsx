import React, { FC } from "react"

type Props = {
  result: SearchResult
}

const SearchResults: FC<Props> = ({ result }) => {
  return (
    <div className="SearchResult">
      { result }
    </div>
  )
}
export default SearchResults
