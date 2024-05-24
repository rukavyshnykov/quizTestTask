import { RouterProvider, createHashRouter } from 'react-router-dom'

import { Layout } from './components/Layout/Layout'
import { FinishPage } from './pages/FinishPage/FinishPage'
import { PlayPage } from './pages/PlayPage/PlayPage'
import { QuizPage } from './pages/Quiz/QuizPage'
import { Quizzes } from './pages/Quizzes/Quizzes'

export const router = createHashRouter([
  {
    children: [
      {
        element: <Quizzes />,
        path: '/',
      },
      {
        element: <QuizPage />,
        path: '/:id',
      },
      {
        element: <PlayPage />,
        path: '/:id/:index',
      },
      {
        element: <FinishPage />,
        path: '/:id/finish',
      },
    ],
    element: <Layout />,
  },
])

export const Router = () => {
  return <RouterProvider router={router} />
}
