import React, { ReactNode } from "react"
import styled from "styled-components"
import Label from "./Label"

type Value = string | ReactNode
type KeyValueDetail = string | ReactNode | [string, Value]
type KeyValueDetails = KeyValueDetail[]

type Props = {
  title?: string,
  data: KeyValueDetails
}

const P = styled.p`
  margin-bottom: 8px;
`

const CaseDetailSection: React.FC<Props> = ({ title, data }) => {
  const hasTitle = title !== undefined
  return (
    <section>
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
    </section>
  )
}

export default CaseDetailSection
