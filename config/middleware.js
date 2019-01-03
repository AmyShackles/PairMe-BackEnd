const express = require('express')
const helmet = require('helmet')
const morgan = require('morgan')
const cors = require('cors')

const usersRouter = require('../routers/usersRouter.js')
const slackRouter = require('../routers/slackRouter.js')

module.exports = server => {
  server.use(express.json())
  server.use(helmet())
  server.use(morgan('dev'))
  server.use(cors())

  server.use('/api/users', usersRouter)
  server.use('/api/slack', slackRouter)
}
