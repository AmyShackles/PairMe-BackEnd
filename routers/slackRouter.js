require('dotenv').config()
const router = require('express').Router()
const Matcher = require('./config/Matcher.js')
const clientID = process.env.CLIENTID
const clientSecret = process.env.CLIENTSECRET
const request = require('request')

server.get('/', (req, res) => {
  res.send(req.body.challenge)
})

router.get('/oauth', function(req, res) {
  if (!req.query.code) {
    res.status(500)
    res.send({ Error: "Looks like we're not getting code." })
    console.log("Looks like we're not getting code.")
  } else {
    request(
      {
        url: 'http://slack.com/api/oauth.access',
        qs: {
          code: req.query.code,
          client_id: clientID,
          client_secret: clientSecret
        },
        method: 'GET'
      },
      function(error, response, body) {
        if (error) {
          console.log(error)
        } else {
          res.json(body)
        }
      }
    )
  }
})

router.post('/', (req, res) => {
  console.log(req.body)
  const payload = req.body
  res.sendStatus(200)
  if (
    // payload.event.type === 'app_mention' ||
    payload.event.type === 'message'
  ) {
    if (payload.event.text.includes('assist')) {
      console.log(
        'This would have been the adding of a teacher to the Teacher class.'
      )
    } else if (payload.event.text.includes('help')) {
      console.log(
        'This would have been the adding of a student to the Student class.'
      )
    } else {
      res.status(422)
      console.log("I'm sorry, I do not understand that command.")
    }
  }
})

router.post('/command', function(req, res) {
  res.send('Your ngrok tunnel is up and running!')
})

module.exports = router
