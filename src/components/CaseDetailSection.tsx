import React, { ReactNode } from "react"
import styled from "styled-components"

type Value = string | ReactNode
type KeyValueDetail = string | ReactNode | [string, Value]
type KeyValueDetails = KeyValueDetail[]

type Props = {
  title?: string,
  data: KeyValueDetails
}

const Label = styled.label`
  display: inline-block;
  min-width: 120px;
  padding-right: 20px;
  color: #B4B4B4;
  margin-bottom: 8px;
`

const CaseDetailSection: React.FC<Props> = ({ title, data }) => {
  const hasTitle = title !== undefined
  return (
    <section>
      { hasTitle &&
        <h1>{ title }</h1>
      }
      { data.map(keyValue => {
          const hasLabel = Array.isArray(keyValue)
          const key = Array.isArray(keyValue) ? keyValue[0] : keyValue
          const value = Array.isArray(keyValue) ? keyValue[1] : keyValue
          return (
            <div key={ String(key) }>
              { hasLabel &&
                <>
                  <Label>{ key }</Label>
                  <span>{ value }</span>
                </>
              }
              { !hasLabel &&
                <p>{ value }</p>
              }
            </div>
          )
      }) }
    </section>
  )
}

export default CaseDetailSection
