import { Game, Question } from '@/types'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

const initialState: Game = { points: 0 }

const slice = createSlice({
  initialState,
  name: 'game',
  reducers: {
    checkPoints: (state, action: PayloadAction<{ answers: string[]; question: Question }>) => {
      const { answers, question } = action.payload

      if (
        !(
          answers.includes('false') ||
          question.variants.filter(el => el.correct).length !==
            answers.filter(el => el === 'true').length
        )
      ) {
        state.points += action.payload.question.value
      }
    },
  },
})

export const gameReducer = slice.reducer
export const gameActions = slice.actions
