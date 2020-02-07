type Element = HTMLInputElement | HTMLTextAreaElement
type ChangeEventInput = ChangeEvent<Element>
declare type OnChangeHandler = (a: ChangeEventInput) => void
declare type SetState = (a: string) => void
