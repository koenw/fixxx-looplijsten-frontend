import { ChangeEvent, useState } from "react"

type ChangeEventInput = ChangeEvent<HTMLInputElement>
type OnChangeHandler = (a: ChangeEventInput) => void

const useOnChangeState = () : [string, OnChangeHandler]=> {
  const [state, setState] = useState("")
  const onChange = (event: ChangeEventInput) => setState(event.target.value)
  return [state, onChange]
}

export default useOnChangeState
