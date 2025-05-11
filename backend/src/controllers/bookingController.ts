import { PrismaClient } from '@prisma/client';
import { Request, Response, NextFunction } from 'express';

const prisma = new PrismaClient();

export const getVehiclesType = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const wheels = Number(req.query.wheels);
    const vehicles = await prisma.vehicle.findMany({
      where: wheels ? { wheels } : {},
      select: {
        id: true,
        type: true,
      },
    });

    // Optional: remove duplicates if type is repeated
    const uniqueTypes = Array.from(
      new Map(vehicles.map((v) => [v.type, v])).values()
    );

    res.json(uniqueTypes);
  } catch (error) {
    next(error);
  }
};

export const getVehicleModels = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const type = req.query.type as string;

    if (!type) {
      res.status(400).json({ message: "Vehicle type is required." });
      return;
    }

    const vehicles = await prisma.vehicle.findMany({
      where: { type },
      select: {
        id: true,
        model: true,
      },
    });

    res.json(vehicles);
  } catch (error) {
    console.error("Error fetching vehicle models:", error);
    next(error);
  }
};



interface BookingBody {
  firstName: string;
  lastName: string;
  startDate: string;
  endDate: string;
  vehicleId: string;
}

// Utility to generate a random 6-digit booking ID
function generateBookingId(): string {
  const randomNumber = Math.floor(100000 + Math.random() * 900000);
  return `BK-${randomNumber}`;
}


export const submitBooking = async (
  req: Request<{}, {}, BookingBody>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { firstName, lastName, startDate, endDate, vehicleId } = req.body;

    if (!firstName || !lastName || !startDate || !endDate || !vehicleId) {
      res.status(400).json({ message: 'All fields are required.' });
      return;
    }

    const overlapping = await prisma.booking.findFirst({
      where: {
        vehicleId,
        AND: [
          { startDate: { lte: new Date(endDate) } },
          { endDate: { gte: new Date(startDate) } },
        ],
      },
    });

    if (overlapping) {
      res.status(400).json({ message: 'Vehicle already booked for these dates.' });
      return;
    }

    const bookingId = generateBookingId();

    const booking = await prisma.booking.create({
      data: {
        bookingId,
        firstName,
        lastName,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        vehicleId,
      },
    });

    res.status(201).json({
      success: true,
      bookingId: booking.bookingId,
    });
  } catch (error) {
    console.error('Booking error:', error);
    next(error);
  }
};
