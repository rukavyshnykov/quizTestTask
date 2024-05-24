export const formatTime = (timer: number) => {
  const minutes = Math.floor(timer / 60)
    .toString()
    .padStart(2, '0')
  const seconds = Math.floor(timer % 60)
    .toString()
    .padStart(2, '0')

  return { minutes, seconds }
}
