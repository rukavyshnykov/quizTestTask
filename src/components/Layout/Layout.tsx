import { useEffect } from 'react'
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

  return (
    <div>
      <div className={'flex items-center bg-stone-700 gap-2.5 p-5 justify-between'}>
        <h1
          className={
            'px-2 py-2 rounded-lg shadow-2xl cursor-pointer font-bold text-2xl bg-slate-300'
          }
          onClick={() => navigate('/')}
        >
          React Quiz
        </h1>
      </div>
      <div className={'mb-8 mt-8 w-full'}>
        <div className={'flex justify-center mx-auto my-0 max-w-7xl w-full'}>
          <Outlet />
        </div>
      </div>
    </div>
  )
}
