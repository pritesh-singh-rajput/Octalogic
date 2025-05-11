// export const getVehicleTypes = async (wheels: string) => {
//   // Simulate API call delay
//   await new Promise((resolve) => setTimeout(resolve, 800));

//   if (wheels === "2") {
//     return [
//       { id: 1, name: "Motorcycle" },
//       { id: 2, name: "Scooter" },
//     ];
//   } else {
//     return [
//       { id: 3, name: "Sedan" },
//       { id: 4, name: "SUV" },
//       { id: 5, name: "Hatchback" },
//     ];
//   }
// };

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

// Fetch vehicle types by number of wheels (2 or 4)
export async function getVehicleTypes(wheels: string) {
  const res = await fetch(`${BASE_URL}/vehicles?wheels=${wheels}`)
  if (!res.ok) throw new Error('Failed to fetch vehicle types')
  return res.json()
}

export const getVehicleModels = async (typeId: string) => {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 800));

  const modelsByType: any = {
    1: [
      // Motorcycle
      { id: 101, name: "Harley Davidson Iron 883" },
      { id: 102, name: "Yamaha YZF R15" },
      { id: 103, name: "Royal Enfield Classic 350" },
    ],
    2: [
      // Scooter
      { id: 201, name: "Vespa SXL 150" },
      { id: 202, name: "Honda Activa 6G" },
      { id: 203, name: "TVS Jupiter" },
    ],
    3: [
      // Sedan
      { id: 301, name: "Honda City" },
      { id: 302, name: "Hyundai Verna" },
      { id: 303, name: "Maruti Suzuki Dzire" },
    ],
    4: [
      // SUV
      { id: 401, name: "Hyundai Creta" },
      { id: 402, name: "Tata Nexon" },
      { id: 403, name: "Kia Seltos" },
    ],
    5: [
      // Hatchback
      { id: 501, name: "Maruti Suzuki Swift" },
      { id: 502, name: "Hyundai i20" },
      { id: 503, name: "Tata Altroz" },
    ],
  };

  return modelsByType[typeId] || [];
};

export const submitBooking = async (bookingData: any) => {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 1500));

  // In a real app, this would send data to a server
  console.log("Booking submitted:", bookingData);
  return { success: true, bookingId: "BK" + Math.floor(Math.random() * 10000) };
};
