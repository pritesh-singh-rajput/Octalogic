import { useForm } from 'react-hook-form'
import { Button, RadioGroup, FormControlLabel, Radio, FormLabel } from '@mui/material'

export default function StepWheels({ onNext, defaultValues }: any) {
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: { wheels: defaultValues.wheels || '' }
  })

  const onSubmit = (data: any) => onNext(data)

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <FormLabel>Number of Wheels</FormLabel>
      <RadioGroup>
        <FormControlLabel value="2" control={<Radio />} label="2 Wheeler" {...register('wheels', { required: true })} />
        <FormControlLabel value="4" control={<Radio />} label="4 Wheeler" {...register('wheels', { required: true })} />
      </RadioGroup>
      {errors.wheels && <p className="text-red-500">Please select an option</p>}
      <Button type="submit" variant="contained">Next</Button>
    </form>
  )
}
