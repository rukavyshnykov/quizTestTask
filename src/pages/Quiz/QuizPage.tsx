import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'

import { QuestionItem } from '@/components/QuestionItem/QuestionItem'
import { AddQuestionForm } from '@/forms/AddQuestionForm'
import { selectQuestions, selectQuizzes } from '@/selectors'
import { questionActions } from '@/services/questionSlice'
import { quizActions } from '@/services/quizSlice'
import { AppDispatch } from '@/services/store'
import { Question, Quiz } from '@/types'
import { v1 } from 'uuid'

export const QuizPage = () => {
  const { id } = useParams()
  const dispatch = useDispatch<AppDispatch>()

  const navigate = useNavigate()

  const quizzes = useSelector(selectQuizzes)
  const questions = useSelector(selectQuestions)

  const [quiz, setQuiz] = useState<Quiz>()
  const [name, setName] = useState<string>(quiz?.name ?? '')
  const [editMode, setEditMode] = useState(false)

  useEffect(() => {
    setQuiz(quizzes.find(q => q.id === id))
  }, [quizzes, id])

  const addQuestion = (data: Omit<Question, 'id'>) => {
    dispatch(
      questionActions.addQuestionThunk({
        id: v1(),
        quizId: id ?? '',
        ...data,
      })
    )
  }

  const handleChangeName = () => {
    setEditMode(false)
    dispatch(quizActions.changeQuizThunk({ id, name: name }))
  }

  if (!quiz) {
    return <>Loading</>
  }

  return (
    <div className={'w-full max-w-7xl px-5 flex justify-between flex-wrap'}>
      {editMode ? (
        <div className={'flex gap-3 items-center w-full'}>
          <input onChange={e => setName(e.target.value)} type={'text'} value={name} />
          <button className={'bg-orange-500 p-2 border rounded-md'} onClick={handleChangeName}>
            Change Name
          </button>
        </div>
      ) : (
        <>
          <div className={'flex gap-3 w-full items-center'}>
            <h1 className={'font-bold text-2xl'}>{quiz.name}</h1>
            <button
              className={'bg-orange-500 p-2 border rounded-md'}
              disabled={questions[quiz.id].length < 1}
              onClick={() => navigate(`${1}`)}
              type={'button'}
            >
              Start quiz!
            </button>
          </div>
          <span className={'w-full underline cursor-pointer'} onClick={() => setEditMode(true)}>
            Change quiz name
          </span>
        </>
      )}

      <div>
        {id && questions[id] && questions[id].length ? (
          questions[id].map((question: Question) => (
            <QuestionItem key={question.id} question={question} quizId={id ?? ''} />
          ))
        ) : (
          <>No questions here yet.</>
        )}
      </div>
      <AddQuestionForm onSubmit={addQuestion} />
    </div>
  )
}
