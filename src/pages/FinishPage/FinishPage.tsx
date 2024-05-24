import { useSelector } from 'react-redux'

import { selectGame } from '@/selectors'

export const FinishPage = () => {
  const game = useSelector(selectGame)

  return (
    <div>
      <span>Congratulations!</span>
      <span>It took you sometime!</span>
      <span>Your score: {game.points}</span>
    </div>
  )
}
