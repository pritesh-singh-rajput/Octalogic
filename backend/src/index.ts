import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import bookingRoutes from './routes/bookingRoutes'

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())

app.use('/api', bookingRoutes)

const PORT = process.env.PORT || 4000
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
