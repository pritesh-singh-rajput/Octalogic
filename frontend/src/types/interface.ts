// Vehicle types
export type VehicleCategory = 'hatchback' | 'suv' | 'sedan' | 'cruiser' | 'sports'

// Step 1: User Name
export interface NameData {
  firstName: string
  lastName: string
}

// Step 2: Number of Wheels
export interface WheelsData {
  wheels: 2 | 4
}

// Step 3: Vehicle Type (fetched from DB)
export interface VehicleTypeData {
  id: string
  name: string
}

// Step 4: Specific Model (fetched from DB)
export interface VehicleModelData {
  id: string
  name: string
}

// Step 5: Date Range
export interface DateRangeData {
  startDate: string // ISO date
  endDate: string
}

// Combined Final Form Data
export type BookingFormData = NameData &
  WheelsData &
  VehicleTypeData &
  VehicleModelData &
  DateRangeData
