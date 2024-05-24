import { Game, Question } from '@/types'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

const initialState: Game = { points: 0, time: undefined }

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
    resetPoints: state => {
      state.points = 0
    },
    setTimer: (state, action) => {
      state.time = action.payload
    },
  },
})

export const gameReducer = slice.reducer
export const gameActions = slice.actions
