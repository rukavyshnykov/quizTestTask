import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'

import { Timer } from '@/components/Timer/Timer'
import { formatTime } from '@/components/Timer/utils'
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
  const [timer, setTimer] = useState(0)

  useEffect(() => {
    setQuiz(quizzes.find(q => q.id === id))
  }, [quizzes, id])

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer(prev => prev + 1)

      return () => clearInterval(interval)
    }, 1000)
  }, [])

  const { minutes, seconds } = formatTime(timer)

  const onSubmit = (data: FormValues) => {
    dispatch(
      gameActions.checkPoints({ answers: data.answers, question: questions[id][Number(index) - 1] })
    )

    if (quiz && questions[quiz.id].length === Number(index)) {
      navigate(`/${id}/finish`)
      dispatch(gameActions.setTimer(`${minutes} : ${seconds}`))
    } else {
      navigate(`/${id}/${Number(index) + 1}`)
    }
  }

  if (!quiz) {
    return <>Oops! Something went wrong</>
  }

  return (
    <div className={'flex flex-col w-full px-5'}>
      <span className={'text-lg font-bold'}>Quiz: {quiz.name}</span>
      <span className={'font-bold text-2xl'}>{questions[quiz.id][Number(index) - 1].text}</span>
      <span className={'text-sm'}>
        Question {index} of {questions[quiz.id].length}
      </span>
      <form className={'mt-6 flex flex-col gap-2'} onSubmit={handleSubmit(onSubmit)}>
        {questions[quiz.id][Number(index) - 1].variants.map(ans => (
          <div key={ans.text}>
            <label
              className={
                'bg-orange-200 flex items-center gap-4 transition hover:bg-orange-300 w-fit p-2'
              }
            >
              {ans.text}
              <input type={'checkbox'} value={String(ans.correct)} {...register('answers')} />
            </label>
          </div>
        ))}

        <button className={'bg-orange-500 p-2 border rounded-md mt-6 w-fit'} type={'submit'}>
          {questions[quiz.id].length === Number(index) ? <>Finish Test</> : <>Next Question</>}
        </button>
        <Timer timer={timer} />
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
