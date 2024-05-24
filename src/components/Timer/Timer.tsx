import { formatTime } from './utils'

export const Timer = ({ timer }: TimerProps) => {
  const { minutes, seconds } = formatTime(timer)

  return (
    <div className={'flex text-sm'}>
      <span>Time: </span>
      <div className={'ml-1'}>
        <h1>{minutes}</h1>
      </div>
      <span className={'mx-1'}>:</span>
      <div className={'timer-box'}>
        <h1>{seconds}</h1>
      </div>
    </div>
  )
}

type TimerProps = {
  timer: number
}
