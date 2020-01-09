import React, { FC, useContext } from "react"
import { Link } from "@reach/router"
import styled from "styled-components"
import { Search as SearchIcon } from "@datapunt/asc-assets"
import { to } from "../../config/domain"
import stateContext from "../../contexts/StateContext"

const NavWrap = styled.div`
  position: fixed
  width: 100%
  top: 50px
  left: 0
  z-index: 9999
`

const Nav = styled.nav`
  background-color: #E6E6E6
  padding: 12px
  padding-bottom: 0
  margin-bottom: 12px
  width: calc(100% - 24px);
`
const Ul = styled.ul`
  list-style: none
  margin: 0
  padding: 0
  display: flex
  justify-content: space-between
`
const Li = styled.li`
  border-bottom: 5px solid transparent
  border-bottom-color: ${ (props: { isActive?: boolean }) => props.isActive ? 'red' : 'transparent' }
  padding-bottom: 7px
  a {
    color: black
  }
`
const LiSearch = styled.li`
  width: 24px
  height: 24px
  margin-right: 16px
  border-bottom: 5px solid transparent
  border-bottom-color: ${ (props: { isActive?: boolean }) => props.isActive ? 'red' : 'transparent' }
  padding-bottom: 7px
`

const Navigation: FC = () => {

  const {
    state: {
      itineraries: {
        itineraries
      }
    }
  } = useContext(stateContext)

  const numItineraries = itineraries ? itineraries.length : 0
  const showCounter = numItineraries > 0

  const pathname = window.location.pathname
  const looplijstActive = pathname === to("/", false)
  const searchActive = pathname === to("/zoeken", false) || pathname === to("/parse", false)

  return (
    <NavWrap>
      <Nav>
        <Ul>
          <Li isActive={ looplijstActive }><Link to={ to("/") }>Mijn looplijst { showCounter && `(${ numItineraries })` }</Link></Li>
          <LiSearch isActive={ searchActive }><Link to={ to("/zoeken") }><SearchIcon /></Link></LiSearch>
        </Ul>
      </Nav>
    </NavWrap>
  )
}
export default Navigation
