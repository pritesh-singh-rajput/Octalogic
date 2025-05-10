import { useState } from 'react'
import StepName from './steps/StepName'
import StepWheels from './steps/StepWheels'
import StepVehicleType from './steps/StepVehicleType'
import StepVehicleModel from './steps/StepVehicleModel'
import StepDateRange from './steps/StepDateRange'

export default function StepForm() {
  const [step, setStep] = useState(0)
  const [formData, setFormData] = useState<any>({})

  const next = (data: any) => {
    setFormData({ ...formData, ...data })
    setStep((prev) => prev + 1)
  }

  const steps = [
    <StepName key="name" onNext={next} defaultValues={formData} />,
    // <StepWheels key="wheels" onNext={next} defaultValues={formData} />,
    // <StepVehicleType key="vehicleType" onNext={next} wheels={formData.wheels} defaultValues={formData} />,
    // <StepVehicleModel key="vehicle" onNext={next} vehicleTypeId={formData.vehicleTypeId} defaultValues={formData} />,
    // <StepDateRange key="dateRange" onNext={next} defaultValues={formData} />,
  ]

  return <div className="max-w-md mx-auto p-4">{steps[step]}</div>
}
