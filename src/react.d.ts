declare type SetState = Dispatch<SetStateAction<never[]>>

type Element = HTMLInputElement | HTMLTextAreaElement
declare type ChangeEventInput = ChangeEvent<Element>
declare type OnChangeHandler = (a: ChangeEventInput) => void

type Value = string | ReactNode
declare type KeyValueDetail = Value | [string, Value]
declare type KeyValueDetails = KeyValueDetail[]
