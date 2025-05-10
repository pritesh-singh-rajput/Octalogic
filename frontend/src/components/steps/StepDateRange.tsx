import { useForm } from 'react-hook-form'
import { Button } from '@mui/material'

export default function StepDateRange({ onNext, defaultValues }: any) {
  const { register, handleSubmit, watch, formState: { errors } } = useForm({
    defaultValues: {
      startDate: defaultValues.startDate || '',
      endDate: defaultValues.endDate || '',
    }
  })

  const start = watch('startDate')

  const onSubmit = (data: any) => {
    if (data.endDate <= data.startDate) {
      alert('End date must be after start date')
      return
    }
    onNext(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <label className="block">Start Date</label>
      <input type="date" {...register('startDate', { required: true })} className="border p-2 w-full rounded" />
      {errors.startDate && <p className="text-red-500">Start date is required</p>}

      <label className="block mt-4">End Date</label>
      <input type="date" {...register('endDate', { required: true })} className="border p-2 w-full rounded" />
      {errors.endDate && <p className="text-red-500">End date is required</p>}

      <Button type="submit" variant="contained">Submit</Button>
    </form>
  )
}
