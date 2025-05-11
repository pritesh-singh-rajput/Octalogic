import express from 'express'
import { getVehiclesType, getVehicleModels, submitBooking } from '../controllers/bookingController'

const router = express.Router()

router.get('/vehicles', getVehiclesType)
router.get('/models', getVehicleModels)
router.post('/book', submitBooking)

export default router
