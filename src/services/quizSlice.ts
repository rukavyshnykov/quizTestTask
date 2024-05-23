import { requests } from '@/requests/localStorageRequests'
import { Quiz } from '@/types'
import { PayloadAction, asyncThunkCreator, buildCreateSlice } from '@reduxjs/toolkit'
import { v1 } from 'uuid'

import { RootState } from './store'

const initialState: Quiz[] = []

const createAppSlice = buildCreateSlice({
  creators: { asyncThunk: asyncThunkCreator },
})

const slice = createAppSlice({
  initialState,
  name: 'quiz',
  reducers: create => ({
    addQuiz: create.reducer((state, action: PayloadAction<{ quiz: Quiz }>) => {
      state = [...state, action.payload.quiz]
    }),
    addQuizThunk: create.asyncThunk(
      async (name: string, thunkAPI) => {
        const { getState } = thunkAPI
        const state = getState() as RootState
        const quiz = { id: v1(), name }

        try {
          await requests.asyncAddQuiz('quizzes', [...state.quiz, quiz])

          return quiz
        } catch (e) {
          console.error(e)
        }
      },
      {
        fulfilled: (state, action) => {
          state.push(action.payload as Quiz)
        },
      }
    ),
    deleteQuizThunk: create.asyncThunk(
      async (id: string, thunkAPI) => {
        const { getState } = thunkAPI
        const state = getState() as RootState
        const newState = state.quiz.filter(q => q.id !== id)

        try {
          await requests.asyncAddQuiz('quizzes', newState)

          return id
        } catch (e) {
          console.error(e)
        }
      },
      {
        fulfilled: (state, action) => {
          return state.filter(q => q.id !== action.payload)
        },
      }
    ),
    getQuizThunk: create.asyncThunk(
      async () => {
        try {
          const res = await requests.asyncGetItem('quizzes')

          return res
        } catch (e) {
          console.error(e)
        }
      },
      {
        fulfilled: (_, action) => {
          return action.payload as Quiz[]
        },
      }
    ),
  }),
})

export const quizReducer = slice.reducer
export const quizActions = slice.actions
