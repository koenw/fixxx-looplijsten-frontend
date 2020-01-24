import React, { FC } from "react"
import SearchForm from "./SearchForm"
import SearchResults from "./SearchResults"
import { Spinner } from "@datapunt/asc-ui"
import { Link } from "@reach/router"
import { to } from "../../config/domain"
import styled from "styled-components"
import useGlobalState from "../../hooks/useGlobalState"

const Div = styled.div`
  display: flex
  justify-content: flex-end
  a {
    position: relative
    top: -46px
    padding: 12px 15px
    margin-bottom: 0
  }
`
const StyledLink = styled(Link)`
  color: #4caf50
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
        <StyledLink to={ to("/parse") }>Copy + paste TamTam lijst</StyledLink>
      </Div>
      { showSpinner &&
        <Spinner size={ 40 } />
      }
      <SearchResults results={ results } />
    </div>
  )
}
export default Search
