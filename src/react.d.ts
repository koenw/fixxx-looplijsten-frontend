declare type SetState = Dispatch<SetStateAction<never[]>>

type Element = HTMLInputElement | HTMLTextAreaElement
declare type ChangeEventInput = ChangeEvent<Element>
declare type OnChangeHandler = (a: ChangeEventInput) => void
