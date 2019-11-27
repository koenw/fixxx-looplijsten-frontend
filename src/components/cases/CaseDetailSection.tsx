import React, { ReactNode } from "react"
import styled from "styled-components"
import Label from "../styled/Label"
import Footer from "./Footer"
import InvalidDataSpan from "../global/InvalidDataSpan"

type Value = string | ReactNode
type KeyValueDetail = string | ReactNode | [string, Value]
type KeyValueDetails = KeyValueDetail[]

type Props = {
  id?: string
  title?: string
  data: KeyValueDetails
  footer?: {
    title: string
    link: string
  }
}

const Section = styled.section`
  border: 1px solid #B4B4B4
  margin-bottom: 24px
  padding: 8px
`

const P = styled.p`
  margin-bottom: 8px
`

const CaseDetailSection: React.FC<Props> = ({ id = "", title, data, footer }) => {

  const hasTitle = title !== undefined
  const showFooter = footer !== undefined

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
          const isUndefined = value === undefined

          return (
            <div key={ String(key) + index }>
              { hasLabel &&
                <>
                  <Label>{ key }</Label>
                  { isUndefined ?
                    <InvalidDataSpan /> :
                    <span>{ value }</span>
                  }
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
      { showFooter &&
        <Footer>
          <a href={ footer!.link }>{ footer!.title }</a>
        </Footer>
      }
    </Section>
  )
}

export default CaseDetailSection
