import { useForm } from 'react-hook-form'

import { Button } from '@/components/Button'
import { ControlledCheckbox } from '@/components/ControlledCheckbox'
import { ControlledInput } from '@/components/ControlledInput'
import { zodResolver } from '@hookform/resolvers/zod'
import z from 'zod'

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(3),
  rememberMe: z.boolean().optional(),
})

export type AddQuestionFormValues = z.infer<typeof loginSchema>

export const AddQuestionFrom = ({ onSubmit }: AddQuestionFormProps) => {
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<AddQuestionFormValues>({
    resolver: zodResolver(loginSchema),
  })

  return (
    <div>
      <span>Add Question</span>
      <form className={''} onSubmit={handleSubmit(onSubmit)}>
        <ControlledInput
          control={control}
          defaultValue={''}
          errorMessage={errors.email?.message}
          label={'Email'}
          name={'email'}
          type={'text'}
        />
        <ControlledCheckbox
          control={control}
          defaultValue={false}
          label={'Remember me'}
          name={'rememberMe'}
        />
        <Button fullWidth type={'submit'}>
          Add Question
        </Button>
      </form>
    </div>
  )
}

type AddQuestionFormProps = {
  onSubmit: (data: AddQuestionFormValues) => void
}
