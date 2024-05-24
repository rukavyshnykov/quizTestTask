import { useForm } from 'react-hook-form'

export const AddQuizForm = ({ onSubmit }: AddQuizFormProps) => {
  const { handleSubmit, register } = useForm<FormValues>({
    defaultValues: {
      name: '',
    },
  })

  return (
    <div className={'flex flex-col align-middle border-2 p-3 border-black ml-auto self-baseline'}>
      <span className={'text-center mb-4 font-bold text-lg'}>Add Quiz</span>
      <form className={'flex flex-col align-middle gap-4'} onSubmit={handleSubmit(onSubmit)}>
        <div className={'flex justify-between gap-2'}>
          <label className={'inline-block w-min'}>
            <span>Quiz name</span>
            <input type={'text'} {...register('name')} />
          </label>
        </div>
        <button className={'bg-orange-500 p-2 border rounded-md'} type={'submit'}>
          Add Quiz
        </button>
      </form>
    </div>
  )
}

type FormValues = { name: string }

type AddQuizFormProps = {
  onSubmit: (data: FormValues) => void
}
