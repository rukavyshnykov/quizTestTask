import { MouseEvent } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { quizActions } from '@/services/quizSlice'
import { AppDispatch } from '@/services/store'
import { Quiz } from '@/types'

export const QuizCard = ({ quiz }: QuizProps) => {
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()

  const deleteQuiz = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    dispatch(quizActions.deleteQuizThunk(quiz.id))
  }

  return (
    <div
      className={'flex flex-col items-center p-4 bg-slate-500 border-2 border-red-900'}
      onClick={() => navigate(`/${quiz.id}`)}
    >
      <div>{quiz.name}</div>
      <div>{quiz.id}</div>
      <button onClick={e => deleteQuiz(e)}>Delete</button>
    </div>
  )
}

type QuizProps = {
  quiz: Quiz
}
