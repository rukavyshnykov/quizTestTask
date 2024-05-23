import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import { Layout } from './components/Layout/Layout'
import { QuizPage } from './pages/Quiz/QuizPage'
import { Quizzes } from './pages/Quizzes/Quizzes'

export const router = createBrowserRouter([
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
    ],
    element: <Layout />,
  },
])

export const Router = () => {
  return <RouterProvider router={router} />
}
