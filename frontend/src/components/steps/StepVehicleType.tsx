import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { getVehicleTypes } from '../../services/api'
import { Button, FormControlLabel, Radio, RadioGroup, FormLabel } from '@mui/material'
import type { VehicleTypeData } from '../../types/interface'

export default function StepVehicleType({ onNext, wheels, defaultValues }: any) {
  const [types, setTypes] = useState<VehicleTypeData[]>([])
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: { vehicleTypeId: defaultValues.vehicleTypeId || '' }
  })

  useEffect(() => {
    getVehicleTypes(Number(wheels)).then(setTypes)
  }, [wheels])

  const onSubmit = (data: any) => onNext(data)

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <FormLabel>Select Vehicle Type</FormLabel>
      <RadioGroup>
        {types.map((type) => (
          <FormControlLabel key={type.id} value={type.id.toString()} control={<Radio />} label={type.name} {...register('vehicleTypeId', { required: true })} />
        ))}
      </RadioGroup>
      {errors.vehicleTypeId && <p className="text-red-500">Select one type</p>}
      <Button type="submit" variant="contained">Next</Button>
    </form>
  )
}
