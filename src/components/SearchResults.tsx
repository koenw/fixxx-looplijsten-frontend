import React, { FC } from "react"

type Props = {
  results: SearchResults 
}

const SearchResults: FC<Props> = ({ results }) => {
  return (
    <div className="SearchResults">
    {
      results.map(result => console.log(result))
    }
    </div>
  )
}
export default SearchResults
