const BASE_URL = 'http://localhost:3000/api' // Update this if your backend runs on a different port or path

// Fetch vehicle types by number of wheels (2 or 4)
export async function getVehicles(wheels: number) {
  const res = await fetch(`${BASE_URL}/vehicle-types?wheels=${wheels}`)
  if (!res.ok) throw new Error('Failed to fetch vehicle types')
  return res.json()
}

// Fetch vehicle types by number of wheels (2 or 4)
export async function getVehicleTypes(wheels: number) {
  const res = await fetch(`${BASE_URL}/vehicle-types?wheels=${wheels}`)
  if (!res.ok) throw new Error('Failed to fetch vehicle types')
  return res.json()
}

// Fetch specific vehicle models by type ID
export async function getVehicleModels(vehicleTypeId: string) {
  const res = await fetch(`${BASE_URL}/vehicles?vehicleTypeId=${vehicleTypeId}`)
  if (!res.ok) throw new Error('Failed to fetch vehicle models')
  return res.json()
}

// Submit the booking data
export async function submitBooking(data: any) {
  const res = await fetch(`${BASE_URL}/bookings`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  if (!res.ok) {
    const errorData = await res.json()
    throw new Error(errorData.message || 'Booking failed')
  }
  return res.json()
}
