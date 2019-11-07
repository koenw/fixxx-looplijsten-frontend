import React, { ReactNode } from "react"
import styled from "styled-components"
import Label from "./Label"

type Value = string | ReactNode
type KeyValueDetail = string | ReactNode | [string, Value]
type KeyValueDetails = KeyValueDetail[]

type Props = {
  id?: string
  title?: string
  data: KeyValueDetails
}

const Section = styled.section`
  border: 1px solid #B4B4B4;
  margin-bottom: 24px;
  padding: 8px;
`

const P = styled.p`
  margin-bottom: 8px;
`

const CaseDetailSection: React.FC<Props> = ({ id = "", title, data }) => {
  const hasTitle = title !== undefined
  return (
    <Section id={ id }>
      { hasTitle &&
        <h1>{ title }</h1>
      }
      { data.map((keyValue, index) => {
          const hasLabel = Array.isArray(keyValue)
          const key = Array.isArray(keyValue) ? keyValue[0] : keyValue
          let value = Array.isArray(keyValue) ? keyValue[1] : keyValue
          if (typeof value === "boolean") {
            value = value === true ? "Ja" : "Nee"
          }
          const isString = typeof value === "string"

          return (
            <div key={ String(key) + index }>
              { hasLabel &&
                <>
                  <Label>{ key }</Label>
                  <span>{ value }</span>
                </>
              }
              { !hasLabel &&
                <>
                  { isString && <P>{ value }</P> }
                  { !isString && value }
                </>
              }
            </div>
          )
      }) }
    </Section>
  )
}

export default CaseDetailSection
