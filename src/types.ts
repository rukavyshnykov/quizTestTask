export type Quiz = {
  id: string
  lastScore: string | undefined
  name: string
}

export type Question = {
  id: string
  text: string
  value: number
  variants: Variant[]
}

export type QuestionStateType = {
  [key: string]: Question[]
}

export type Variant = {
  correct: boolean
  text: string
}

export type Game = {
  points: number
}
