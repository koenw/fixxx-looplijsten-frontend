import { ChangeEvent, useState } from "react"

type Element = HTMLInputElement | HTMLTextAreaElement
type ChangeEventInput = ChangeEvent<Element>
type OnChangeHandler = (a: ChangeEventInput) => void

const useOnChangeState = (defaultState = "") : [string, OnChangeHandler]=> {
  const [state, setState] = useState(defaultState)
  const onChange = (event: ChangeEventInput) => setState(event.target.value)
  return [state, onChange]
}

export default useOnChangeState
