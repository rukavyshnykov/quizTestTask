import { useNavigate } from 'react-router-dom'

import { Quiz } from '@/types'

export const QuizCard = ({ quiz }: QuizProps) => {
  const navigate = useNavigate()

  return (
    <div
      className={'flex flex-col items-center p-4 bg-slate-500 border-2 border-red-900'}
      onClick={() => navigate(`/${quiz.id}`)}
    >
      <div>{quiz.name}</div>
      <div>{quiz.id}</div>
    </div>
  )
}

type QuizProps = {
  quiz: Quiz
}
