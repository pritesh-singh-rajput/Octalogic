const BASE_URL = import.meta.env.VITE_BACKEND_URL;

// Fetch vehicle types by number of wheels (2 or 4)
export async function getVehicleTypes(wheels: string) {
  const res = await fetch(`${BASE_URL}/vehicles?wheels=${wheels}`);
  if (!res.ok) throw new Error("Failed to fetch vehicle types");
  return res.json();
}

export async function getVehicleModels(typeId: string) {
  const res = await fetch(`${BASE_URL}/models?type=${typeId}`);
  if (!res.ok) throw new Error("Failed to fetch vehicle models");
  return res.json();
}

export const submitBooking = async (bookingData: {
  firstName: string;
  lastName: string;
  startDate: string;
  endDate: string;
  vehicleId: string;
}) => {
  const res = await fetch(`${BASE_URL}/book`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(bookingData),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Failed to submit booking");
  }
  const data = await res.json();
  return data;
};
