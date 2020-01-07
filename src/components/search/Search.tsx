import React, { FC, useState, useContext } from "react"
import SearchForm from "./SearchForm"
import SearchResults from "./SearchResults"
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
        query,
        results
      }
    }
  } = useContext(stateContext)

  const showResults = query !== undefined
  const searchResults = results.map(result => ({
    success: true,
    data: {
      cases: [result]
    }
  }))

  return (
    <div className="Search">
      <SearchForm />
      <Div>
        <Link to={ to("/parse") }>Copy + paste TamTam looplijst</Link>
      </Div>
      { showResults &&
        <SearchResults results={ searchResults } />
      }
    </div>
  )
}
export default Search
