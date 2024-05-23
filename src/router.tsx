import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import { Layout } from './components/Layout/Layout'
import { Quizzes } from './pages/Quizzes/Quizzes'

export const router = createBrowserRouter([
  {
    children: [
      {
        element: <Quizzes />,
        path: '/',
      },
    ],
    element: <Layout />,
  },
])

export const Router = () => {
  return <RouterProvider router={router} />
}
