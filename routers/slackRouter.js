require('dotenv').config()
const axios = require('axios')
const router = require('express').Router()
const { student, teacher, match } = require('../config/Matcher.js')
const clientID = process.env.CLIENTID
const clientSecret = process.env.CLIENTSECRET
const request = require('request')

// uncomment for URL registration with slack API
router.post('/', (req, res) => {
  const { challenge } = req.body
  res.send(challenge)
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
  res.status(200).send({ ok: true })
  const { text, user } = req.body.event
  const topics = text.split(' ')
  topics.splice(0, 1)

  if (text.includes('assist')) {
    teacher._add(topics, user)
    const [user1, user2] = match(topics)
    if (user1 && user2) {
      const message = `Hey, <@${user1}>, <@${user2}> is available to help!`
      axios.post(
        'https://hooks.slack.com/services/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',
        { text: message }
      )
    }
  } else if (text.includes('help')) {
    student._add(topics, user)
    const [user1, user2] = match(topics)
    if (user1 && user2) {
      const message = `Hey, <@${user1}>, <@${user2}> is available to help!`
      axios.post(
        'https://hooks.slack.com/services/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',
        { text: message }
      )
    }
  } else {
    const message = `Hey, <@${user}>, I do not understand that command.`
    axios.post(
      'https://hooks.slack.com/services/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',
      { text: message }
    )
  }
})

router.post('/command', function(req, res) {
  res.send('Your ngrok tunnel is up and running!')
})

module.exports = router
