import { ChangeEvent, useState } from "react"

type Element = HTMLInputElement | HTMLTextAreaElement
type ChangeEventInput = ChangeEvent<Element>
type OnChangeHandler = (a: ChangeEventInput) => void
type SetState = (a: string) => void

const useOnChangeState = (defaultState = "") : [string, OnChangeHandler, SetState] => {
  const [state, setState] = useState(defaultState)
  const onChange = (event: ChangeEventInput) => setState(event.target.value)
  return [state, onChange, setState]
}

export default useOnChangeState
