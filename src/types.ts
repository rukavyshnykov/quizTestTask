export type Quiz = {
  id: string
  name: string
}

export type Question = {
  answer: string
  id: string
  text: string
  value: string //TODO:Change to number
  variants: Variant[] | undefined
}

export type QuestionStateType = {
  [key: string]: Question[]
}

export type Variant = {
  correct: boolean
  text: string
}
