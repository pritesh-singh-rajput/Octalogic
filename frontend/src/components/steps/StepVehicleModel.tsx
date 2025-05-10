import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { getVehicles } from '../../services/api'
import { Button, RadioGroup, FormControlLabel, Radio, FormLabel } from '@mui/material'
import type { VehicleModelData } from '../../types/interface'

export default function StepVehicleModel({ onNext, vehicleTypeId, defaultValues }: any) {
  const [vehicles, setVehicles] = useState<VehicleModelData[]>([])
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: { vehicleId: defaultValues.vehicleId || '' }
  })

  useEffect(() => {
    getVehicles(Number(vehicleTypeId)).then(setVehicles)
  }, [vehicleTypeId])

  const onSubmit = (data: any) => onNext(data)

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <FormLabel>Select Vehicle Model</FormLabel>
      <RadioGroup>
        {vehicles.map((v) => (
          <FormControlLabel key={v.id} value={v.id.toString()} control={<Radio />} label={v.name} {...register('vehicleId', { required: true })} />
        ))}
      </RadioGroup>
      {errors.vehicleId && <p className="text-red-500">Select a model</p>}
      <Button type="submit" variant="contained">Next</Button>
    </form>
  )
}
