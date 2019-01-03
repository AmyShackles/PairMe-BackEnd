require('dotenv').config()
const server = require('./api/server.js')

// end point for testing server running

const port = process.env.PORT || 5555 // update production environment PORT
server.listen(port, () =>
  console.log(`\n-----Listening on port ${port}-----\n`)
)
