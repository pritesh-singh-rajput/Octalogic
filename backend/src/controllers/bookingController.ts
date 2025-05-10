import { PrismaClient } from '@prisma/client';
import { Request, Response, NextFunction } from 'express';

const prisma = new PrismaClient();

export const getVehicles = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const wheels = Number(req.query.wheels);
    const vehicles = await prisma.vehicle.findMany({
      where: wheels ? { wheels } : {},
    });
    res.json(vehicles);
  } catch (error) {
    next(error); // Pass errors to Express error middleware
  }
};

interface BookingBody {
  firstName: string;
  lastName: string;
  startDate: string;
  endDate: string;
  vehicleId: string;
}

export const submitBooking = async (req: Request<{}, {}, BookingBody>, res: Response, next: NextFunction): Promise<void> => {
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

    const booking = await prisma.booking.create({
      data: {
        firstName,
        lastName,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        vehicleId,
      },
    });

    res.status(201).json(booking);
  } catch (error) {
    console.error('Booking error:', error);
    next(error); // Pass errors to Express error middleware
  }
};