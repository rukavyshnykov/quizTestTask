import { configureStore } from '@reduxjs/toolkit'

import { quizReducer } from './quizSlice'

export const store = configureStore({
  middleware: getDefaultMiddleware => getDefaultMiddleware(),
  reducer: {
    quiz: quizReducer,
  },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
