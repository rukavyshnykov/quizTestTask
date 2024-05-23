import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import { QuestionItem } from '@/components/QuestionItem/QuestionItem'
import { selectQuestions, selectQuizzes } from '@/selectors'
import { questionActions } from '@/services/questionSlice'
import { AppDispatch } from '@/services/store'
import { Question, Quiz } from '@/types'
import { v1 } from 'uuid'

export const QuizPage = () => {
  const { id } = useParams()
  const dispatch = useDispatch<AppDispatch>()

  const quizzes = useSelector(selectQuizzes)
  const questions = useSelector(selectQuestions)

  // console.log(questions)

  const [quiz, setQuiz] = useState<Quiz>()

  useEffect(() => {
    setQuiz(quizzes.find(q => q.id === id))
  }, [quizzes, id])

  const addQuestion = () => {
    dispatch(
      questionActions.addQuestionThunk({
        answer: '3',
        id: v1(),
        quizId: id ?? '',
        text: 'queres?',
        value: '3',
        variants: undefined,
      })
    )
  }

  if (!quiz) {
    return <>Loading</>
  }

  return (
    <div className={'w-full max-w-7xl px-5'}>
      <div className={'flex gap-3'}>
        <h1 className={'font-bold text-2xl'}>{quiz.name}</h1>
        <button className={'bg-orange-500 p-2 border rounded-md'} onClick={() => addQuestion()}>
          Add question
        </button>
      </div>
      <div>
        {id && questions[id] ? (
          questions[id].map((question: Question) => (
            <QuestionItem key={question.id} question={question} quizId={id ?? ''} />
          ))
        ) : (
          <>No questions here yet.</>
        )}
      </div>
    </div>
  )
}
