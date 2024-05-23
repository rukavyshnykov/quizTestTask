import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Outlet, useNavigate } from 'react-router-dom'

import { questionActions } from '@/services/questionSlice'
import { quizActions } from '@/services/quizSlice'
import { AppDispatch } from '@/services/store'

export const Layout = () => {
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(quizActions.getQuizThunk())
    dispatch(questionActions.getQuestionsThunk())
  }, [dispatch])

  const [state, setState] = useState('')

  const addQuiz = (name: string) => {
    dispatch(quizActions.addQuizThunk(name))
  }

  return (
    <div>
      <div className={'flex items-center bg-stone-700 gap-2.5 p-5 justify-between'}>
        <h1 onClick={() => navigate('/')}>React Quiz</h1>
        <input onChange={e => setState(e.target.value)} value={state} />
        <button onClick={() => addQuiz(state)}>Add Quiz</button>
      </div>
      <div className={'mb-8 mt-8 w-full'}>
        <div className={'flex justify-center mx-auto my-0 max-w-7xl w-full'}>
          <Outlet />
        </div>
      </div>
    </div>
  )
}
