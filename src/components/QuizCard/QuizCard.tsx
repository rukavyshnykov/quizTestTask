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
      className={
        'flex flex-col items-center p-4 border-2 border-red-900 cursor-pointer transition-all hover:shadow-md hover:shadow-red-600 w-2/5 m-3 shrink'
      }
      onClick={() => navigate(`/${quiz.id}`)}
    >
      <div className={'font-bold text-2xl'}>{quiz.name}</div>
      {quiz.lastScore && <div>Last score: {quiz.lastScore}</div>}
      <button className={'bg-orange-500 p-2 rounded-md mt-auto'} onClick={e => deleteQuiz(e)}>
        Delete
      </button>
    </div>
  )
}

type QuizProps = {
  quiz: Quiz
}
