import { RootState } from './services/store'

export const selectQuizzes = (state: RootState) => state.quiz

export const selectQuestions = (state: RootState) => state.question

export const selectGame = (state: RootState) => state.game
