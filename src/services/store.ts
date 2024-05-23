import { configureStore } from '@reduxjs/toolkit'

import { questionReducer } from './questionSlice'
import { quizReducer } from './quizSlice'

export const store = configureStore({
  middleware: getDefaultMiddleware => getDefaultMiddleware(),
  reducer: {
    question: questionReducer,
    quiz: quizReducer,
  },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
