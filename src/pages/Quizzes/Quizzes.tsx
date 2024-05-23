import { useSelector } from 'react-redux'

import { QuizCard } from '@/components/QuizCard/QuizCard'
import { selectQuizzes } from '@/selectors'
import { Quiz } from '@/types'

export const Quizzes = () => {
  const quiz = useSelector(selectQuizzes)

  return (
    <div className={'flex max-w-7xl flex-wrap justify-between gap-1'}>
      {quiz.length ? (
        quiz.map((q: Quiz) => <QuizCard key={q.id} quiz={q} />)
      ) : (
        <>No quizzes created yet.</>
      )}
    </div>
  )
}
