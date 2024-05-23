import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import { selectQuizzes } from '@/selectors'
import { Quiz } from '@/types'

export const QuizPage = () => {
  const { id } = useParams()
  const quizzes = useSelector(selectQuizzes)

  const [quiz, setQuiz] = useState<Quiz>()

  useEffect(() => {
    setQuiz(quizzes.find(q => q.id === id))
  }, [quizzes, id])

  if (!quiz) {
    return <>Loading</>
  }

  return (
    <div>
      <h1>{quiz.name}</h1>
    </div>
  )
}
