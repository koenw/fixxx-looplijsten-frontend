import React, { FC, useContext } from "react"
import SearchForm from "./SearchForm"
import SearchResults from "./SearchResults"
import { Spinner } from "@datapunt/asc-ui"
import { Link } from "@reach/router"
import { to } from "../../config/domain"
import styled from "styled-components"
import stateContext from "../../contexts/StateContext"

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

  const {
    state: {
      search: {
        isFetching,
        results
      }
    }
  } = useContext(stateContext)

  const showSpinner = isFetching
  const searchResults = results ? results.map(result => ({
    success: true,
    data: {
      cases: [result]
    }
  })) : undefined

  return (
    <div className="Search">
      <SearchForm />
      <Div>
        <Link to={ to("/parse") }>Copy + paste TamTam looplijst</Link>
      </Div>
      { showSpinner &&
        <Spinner size={ 40 } />
      }
      <SearchResults results={ searchResults } />
    </div>
  )
}
export default Search
