import { useFieldArray, useForm } from 'react-hook-form'

import { Question } from '@/types'

type FormValues = Omit<Question, 'id'>

export const AddQuestionForm = ({ onSubmit }: AddQuestionFormProps) => {
  const { control, handleSubmit, register } = useForm<FormValues>({
    defaultValues: {
      text: '',
      value: 1,
      variants: [
        {
          correct: false,
          text: '',
        },
      ],
    },
  })

  const { append, fields } = useFieldArray({
    control,
    name: 'variants',
  })

  return (
    <div className={'flex flex-col align-middle border-2 p-3 border-black'}>
      <span className={'text-center mb-4 font-bold text-lg'}>Add Question</span>
      <form className={'flex flex-col align-middle gap-4'} onSubmit={handleSubmit(onSubmit)}>
        <div className={'flex justify-between gap-2'}>
          <label className={'inline-block w-min'}>
            <span>Question</span>
            <input type={'text'} {...register('text')} />
          </label>
          <label className={'inline-block w-min'}>
            <span>Value</span>
            <input type={'number'} {...register('value', { valueAsNumber: true })} />
          </label>
        </div>
        {fields.map((field, index) => {
          return (
            <div className={'flex gap-2'} key={field.id}>
              <label className={'w-min'}>
                <span>Answer</span>
                <input {...register(`variants.${index}.text`)} type={'text'} />
              </label>
              <label className={'flex items-center justify-center gap-4'}>
                <span>Is this answer correct?</span>
                <input {...register(`variants.${index}.correct`)} type={'checkbox'} />
              </label>
            </div>
          )
        })}
        <button
          className={'bg-orange-500 p-2 border rounded-md w-fit'}
          onClick={() => append({ correct: false, text: '' })}
          type={'button'}
        >
          Add answer
        </button>
        <button className={'bg-orange-500 p-2 border rounded-md'} type={'submit'}>
          Add question
        </button>
      </form>
    </div>
  )
}

type AddQuestionFormProps = {
  onSubmit: (data: Omit<Question, 'id'>) => void
}
