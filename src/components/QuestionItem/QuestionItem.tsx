import { useDispatch } from 'react-redux'

import { questionActions } from '@/services/questionSlice'
import { AppDispatch } from '@/services/store'
import { Question } from '@/types'

export const QuestionItem = ({ question, quizId }: QuestionItemProps) => {
  const dispatch = useDispatch<AppDispatch>()

  const deleteQuestion = () => {
    dispatch(questionActions.deleteQuestionThunk({ ...question, quizId }))
  }

  return (
    <div className={'flex justify-start w-full border-2 border-black m-2 p-2'}>
      <span>{question.text}</span>
      <span>Value: {question.value}</span>
      <button className={'bg-orange-500 p-2 border rounded-md'} onClick={() => deleteQuestion()}>
        DELETE
      </button>
    </div>
  )
}

type QuestionItemProps = {
  question: Question
  quizId: string
}
