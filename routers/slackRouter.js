require('dotenv').config()
const router = require('express').Router()
const { student, teacher } = require('../config/Matcher.js')
const clientID = process.env.CLIENTID
const clientSecret = process.env.CLIENTSECRET
const request = require('request')

// uncomment for URL registration with slack API
// router.post('/', (req, res) => {
//   const { challenge } = req.body
//   res.send(challenge)
// })

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
  const { text, user } = req.body.event
  const topics = text.split(' ').splice(0)
  res.sendStatus(200)
  if (text.includes('assist')) {
    teacher._add(topics, user)
    console.log(
      'This would have been the adding of a teacher to the Teacher class.'
    )
  } else if (text.includes('help')) {
    student._add(topics, user)
    console.log(
      'This would have been the adding of a student to the Student class.'
    )
  } else {
    res.status(422)
    console.log("I'm sorry, I do not understand that command.")
  }
})

router.post('/command', function(req, res) {
  res.send('Your ngrok tunnel is up and running!')
})

module.exports = router
