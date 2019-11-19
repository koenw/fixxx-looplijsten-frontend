import styled from "styled-components"

export default styled.input`
  border: 1px solid rgb(118, 118, 118);
  line-height: 18px
  box-sizing: border-box
  padding: 10px
  &:focus {
    outline: rgb(254, 200, 19) solid 2px
    outline-offset: 0.5px
  }
`
