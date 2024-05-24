import { requests } from '@/requests/localStorageRequests'
import { Question, QuestionStateType } from '@/types'
import { asyncThunkCreator, buildCreateSlice } from '@reduxjs/toolkit'

import { quizActions } from './quizSlice'
import { RootState } from './store'

const createAppSlice = buildCreateSlice({
  creators: { asyncThunk: asyncThunkCreator },
})

const initialState: QuestionStateType = {}

const slice = createAppSlice({
  extraReducers: builder => {
    builder.addCase(quizActions.addQuizThunk.fulfilled, (state, action) => {
      state[action.payload!.id] = []
    }),
      builder.addCase(quizActions.deleteQuizThunk.fulfilled, (state, action) => {
        delete state[action.payload!]
      })
  },
  initialState,
  name: 'question',
  reducers: create => ({
    addQuestionThunk: create.asyncThunk(
      async (payloadQuestion: PayloadQuestion, thunkAPI) => {
        const { getState } = thunkAPI
        const state = getState() as RootState
        const { id, quizId, text, value, variants } = payloadQuestion
        const question = { id, text, value, variants }

        try {
          await requests.mutationSimulation('questions', {
            ...state.question,
            [quizId]: [...state.question[quizId], question],
          })

          return { question, quizId }
        } catch (e) {
          console.error(e)
        }
      },
      {
        fulfilled: (state, action) => {
          state[action.payload!.quizId].push(action.payload!.question)
        },
      }
    ),
    deleteQuestionThunk: create.asyncThunk(
      async (payloadQuestion: PayloadQuestion, thunkAPI) => {
        const { getState } = thunkAPI
        const state = getState() as RootState
        const { id, quizId } = payloadQuestion
        const newQuestions = [...state.question[quizId]].filter(q => q.id !== id)

        try {
          await requests.mutationSimulation('questions', {
            ...state.question,
            [quizId]: newQuestions,
          })

          return { id, quizId }
        } catch (e) {
          console.error(e)
        }
      },
      {
        fulfilled: (state, action) => {
          state[action.payload!.quizId] = state[action.payload!.quizId].filter(
            q => q.id !== action.payload?.id
          )
        },
      }
    ),
    getQuestionsThunk: create.asyncThunk(
      async () => {
        try {
          const res = await requests.querySimulation('questions')

          return res
        } catch (e) {
          console.error(e)
        }
      },
      {
        fulfilled: (_, action) => {
          return action.payload as QuestionStateType
        },
      }
    ),
  }),
})

export const questionActions = slice.actions
export const questionReducer = slice.reducer

type PayloadQuestion = {
  quizId: string
} & Question
