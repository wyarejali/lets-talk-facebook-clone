import bodyParser from 'body-parser'
import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import mongooes from 'mongoose'
import chatRoutes from './routes/chatRoutes.js'
import messageRoutes from './routes/messageRoutes.js'
import userRoutes from './routes/userRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'

// Create app
const app = express()

// Configuration
dotenv.config()

// Middlewares
app.use(bodyParser.json({ limit: '50mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }))
app.use(cors())

// To serve images from public folder
app.use(express.static('public'))
app.use('/uploads', express.static('uploads'))

// Port
const PORT = process.env.PORT || 4000

// MongoDB Connection
mongooes
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(PORT, () =>
      console.log('listening on port ' + PORT + ' Connected to DB')
    )
  )
  .catch((err) => console.error(err.message))

// All Routes
app.use('/api/user', userRoutes)
// Chat Routes
app.use('/api/chat', chatRoutes)
// Message Routes
app.use('/api/message', messageRoutes)
// Upload Routes
app.use('/api/upload', uploadRoutes)
