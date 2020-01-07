import React, { FC } from "react"
import styled from "styled-components"
import SearchResultSingle from "./SearchResultSingle"
import SearchResultPlural from "./SearchResultPlural"

type Props = {
  cases: BWVData[]
}

const Div = styled.div`
  padding: 20px 0 8px
  border-bottom: 4px solid #767676
`

const SearchResult: FC<Props> = ({ cases }) => {

  const showPlural = cases.length > 1
  const caseItem = cases[0]
  
  return (
    <Div className="SearchResult">
      { showPlural ?
        <SearchResultPlural cases={ cases } /> :
        <SearchResultSingle caseItem={ caseItem! } />
      }
    </Div>
  )
}
export default SearchResult
