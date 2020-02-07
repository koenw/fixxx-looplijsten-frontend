import { ChangeEvent, useState } from "react"

const useOnChangeState = (defaultState = "") : [string, OnChangeHandler, SetState] => {
  const [state, setState] = useState(defaultState)
  const onChange = (event: ChangeEventInput) => setState(event.target.value)
  return [state, onChange, setState]
}

export default useOnChangeState
