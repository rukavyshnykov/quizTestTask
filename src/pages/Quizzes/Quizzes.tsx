import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { QuizCard } from '@/components/QuizCard/QuizCard'
import { AddQuizForm } from '@/forms/AddQuizForm'
import { selectQuizzes } from '@/selectors'
import { quizActions } from '@/services/quizSlice'
import { AppDispatch } from '@/services/store'
import { Quiz } from '@/types'

export const Quizzes = () => {
  const dispatch = useDispatch<AppDispatch>()
  const quiz = useSelector(selectQuizzes)
  const [filter, setFilter] = useState('')
  const [filteredQuizzes, setFilteredQuizzes] = useState<Quiz[]>([])

  useEffect(() => {
    setFilteredQuizzes(quiz.filter(el => el.name.toLowerCase().includes(filter)))
  }, [filter, quiz])

  const handleCreateQuiz = (data: { name: string }) => {
    dispatch(quizActions.addQuizThunk(data.name))
  }

  return (
    <div className={'max-w-7xl flex w-full flex-wrap gap-5 px-5'}>
      <div className={'w-full flex gap-4 items-center'}>
        <span className={'font-bold'}>Filter by name:</span>
        <input onChange={e => setFilter(e.target.value)} type={'text'} value={filter} />
      </div>
      <div className={'flex flex-wrap justify-between max-w-2xl w-1/2'}>
        {filteredQuizzes.length ? (
          filteredQuizzes.map((q: Quiz) => <QuizCard key={q.id} quiz={q} />)
        ) : (
          <>No quizzes found.</>
        )}
      </div>
      <AddQuizForm onSubmit={handleCreateQuiz} />
    </div>
  )
}
