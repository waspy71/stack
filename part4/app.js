
const express = require('express')
const blogsRouter = require('./controllers/blogs')
const config = require('./utils/config')
const logger = require('./utils/logger')
const mongoose = require('mongoose')
const usersRouter = require('./controllers/users')
const middleware = require('./utils/middleware')
const loginRouter = require('./controllers/login')

const app = express()


logger.info('connecting to MongoDB')
mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch(error => {
    logger.error('error connecting to MongoDB', error.message)
  })


app.use(express.json())
app.use(middleware.requestLogger)
app.use(middleware.tokenExtractor)

app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)



module.exports = app