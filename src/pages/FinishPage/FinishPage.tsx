import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'

import { selectGame } from '@/selectors'
import { gameActions } from '@/services/gameSlice'
import { quizActions } from '@/services/quizSlice'
import { AppDispatch } from '@/services/store'

export const FinishPage = () => {
  const { id } = useParams<FinishPageParams>() as FinishPageParams
  const game = useSelector(selectGame)
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()

  const handleSave = () => {
    dispatch(quizActions.changeQuizThunk({ id, lastScore: String(game.points) }))
    dispatch(gameActions.resetPoints())
    navigate('/')
  }

  return (
    <div className={'flex flex-col w-full px-5'}>
      <span className={'font-bold text-2xl'}>Congratulations!</span>
      <span className={'text-lg font-bold'}>Your score: {game.points}</span>
      <span className={'text-lg font-bold'}>Time: {game.time}</span>
      <button
        className={'bg-orange-500 p-2 border rounded-md mt-6 w-fit'}
        onClick={() => handleSave()}
      >
        Save Results
      </button>
    </div>
  )
}

type FinishPageParams = {
  id: string
}
