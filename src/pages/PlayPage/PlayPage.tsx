import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'

import { selectQuestions, selectQuizzes } from '@/selectors'
import { gameActions } from '@/services/gameSlice'
import { Quiz } from '@/types'

export const PlayPage = () => {
  const { id, index } = useParams<keyof PlayPageParams>() as PlayPageParams

  const { handleSubmit, register } = useForm<FormValues>()

  const navigate = useNavigate()

  const dispatch = useDispatch()

  const quizzes = useSelector(selectQuizzes)
  const questions = useSelector(selectQuestions)
  const [quiz, setQuiz] = useState<Quiz>()

  useEffect(() => {
    setQuiz(quizzes.find(q => q.id === id))
  }, [quizzes, id])

  const onSubmit = (data: FormValues) => {
    dispatch(
      gameActions.checkPoints({ answers: data.answers, question: questions[id][Number(index) - 1] })
    )
    quiz && questions[quiz.id].length === Number(index)
      ? navigate(`/${id}/finish`)
      : navigate(`/${id}/${Number(index) + 1}`)
  }

  if (!quiz) {
    return <>Oops! Something went wrong</>
  }

  return (
    <div className={'flex flex-col'}>
      <span>{quiz.name}</span>
      <span className={'font-bold text-2xl'}>{questions[quiz.id][Number(index) - 1].text}</span>
      <form onSubmit={handleSubmit(onSubmit)}>
        {questions[quiz.id][Number(index) - 1].variants.map(ans => (
          <div key={ans.text}>
            <label>
              {ans.text}
              <input type={'checkbox'} value={String(ans.correct)} {...register('answers')} />
            </label>
          </div>
        ))}

        <button type={'submit'}>
          {questions[quiz.id].length === Number(index) ? <>Finish Test</> : <>Next Question</>}
        </button>
      </form>
    </div>
  )
}

type PlayPageParams = {
  id: string
  index: string
}

type FormValues = {
  answers: string[]
}
