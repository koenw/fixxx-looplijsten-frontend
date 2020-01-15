import React, { FC } from "react"
import SearchForm from "./SearchForm"
import SearchResults from "./SearchResults"
import { Spinner } from "@datapunt/asc-ui"
import { Link } from "@reach/router"
import { to } from "../../config/domain"
import styled from "styled-components"
import useGlobalState from "../../hooks/useGlobalState"

const Div = styled.div`
  margin: 12px 0
  display: flex
  justify-content: flex-end
  a {
    margin-bottom: 0
  }
`

const Search: FC = () => {

  const {
    search: {
      isFetching,
      results
    }
  } = useGlobalState()

  const showSpinner = isFetching

  return (
    <div className="Search">
      <SearchForm />
      <Div>
        <Link to={ to("/parse") }>Copy + paste TamTam looplijst</Link>
      </Div>
      { showSpinner &&
        <Spinner size={ 40 } />
      }
      <SearchResults results={ results } />
    </div>
  )
}
export default Search
