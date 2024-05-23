import { FieldValues, UseControllerProps, useController } from 'react-hook-form'

import { Input, InputProps } from '@/components/Input'

export type ControlledInputProps<TFieldValues extends FieldValues> = Omit<
  InputProps,
  'onChange' | 'value'
> &
  UseControllerProps<TFieldValues>

export const ControlledInput = <TFieldValues extends FieldValues>({
  errorMessage,
  label,
  type,
  ...useControllerValues
}: ControlledInputProps<TFieldValues>) => {
  const {
    field: { disabled, name, onChange, ref, value },
  } = useController({
    ...useControllerValues,
  })

  return (
    <Input
      disabled={disabled}
      errorMessage={errorMessage}
      label={label}
      name={name}
      onChange={onChange}
      ref={ref}
      type={type}
      value={value}
    />
  )
}
