import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Outlet } from 'react-router-dom'

import { quizActions } from '@/services/quizSlice'
import { AppDispatch } from '@/services/store'

export const Layout = () => {
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    dispatch(quizActions.getQuizThunk())
  }, [dispatch])
  const [state, setState] = useState('')
  const [state1, setState1] = useState('')

  const addQuiz = (name: string) => {
    dispatch(quizActions.addQuizThunk(name))
  }
  const deleteQuiz = (id: string) => {
    dispatch(quizActions.deleteQuizThunk(id))
  }

  return (
    <div>
      <div className={'flex items-center bg-stone-700 gap-2.5 p-5 justify-between'}>
        <h1>React Quiz</h1>
        <input onChange={e => setState(e.target.value)} value={state} />
        <input onChange={e => setState1(e.target.value)} value={state1} />
        <button onClick={() => addQuiz(state)}>Add Quiz</button>
        <button onClick={() => deleteQuiz(state1)}>Delete Quiz</button>
      </div>
      <div className={'mb-8 mt-8 w-full'}>
        <div className={'flex justify-center mx-auto my-0 max-w-7xl'}>
          <Outlet />
        </div>
      </div>
    </div>
  )
}
