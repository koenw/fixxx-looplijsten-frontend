import styled from "styled-components"

export default styled.textarea`
  box-sizing: border-box
  border: 1px solid rgb(118, 118, 118);
  font-size: 1rem
  line-height: 18px
  padding: 10px
  -webkit-appearance: none
  &:focus {
    outline: rgb(254, 200, 19) solid 2px
    outline-offset: 0.5px
  }
`
