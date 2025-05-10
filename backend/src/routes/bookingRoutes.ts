import express from 'express'
import { getVehicles, submitBooking } from '../controllers/bookingController'

const router = express.Router()

router.get('/vehicles', getVehicles)
router.post('/book', submitBooking)

export default router
