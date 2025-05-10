import { useForm } from 'react-hook-form'
import { Button, TextField } from '@mui/material'

interface NameData {
  firstName: string
  lastName: string
}

interface StepNameProps {
  onNext: (data: NameData) => void
  defaultValues: Partial<NameData>
}

export default function StepName({ onNext, defaultValues }: StepNameProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<NameData>({
    defaultValues: {
      firstName: defaultValues.firstName || '',
      lastName: defaultValues.lastName || '',
    },
  })

  const onSubmit = (data: NameData) => {
    onNext(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <TextField
        label="First Name"
        fullWidth
        {...register('firstName', { required: 'First name is required' })}
        error={!!errors.firstName}
        helperText={errors.firstName?.message}
      />

      <TextField
        label="Last Name"
        fullWidth
        {...register('lastName', { required: 'Last name is required' })}
        error={!!errors.lastName}
        helperText={errors.lastName?.message}
      />

      <Button type="submit" variant="contained" className="w-full">
        Next
      </Button>
    </form>
  )
}
