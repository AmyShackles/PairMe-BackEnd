require('dotenv').config()

const express = require('express')
const axios = require('axios')

const { student, teacher } = require('../config/Matcher.js')

const usersDb = require('../data/helpers/usersHelpers.js')

const router = express.Router()

router.post('/login', async (req, res) => {
  console.log('sanity check')
  const { token } = req.body
  const response = await axios
    .get(
      `https://slack.com/api/oauth.access?client_id=${
        process.env.CLIENTID
      }&client_secret=${process.env.CLIENTSECRET}&code=${token}`
    )
    .catch(e => console.log('OAuth failure!', e))

  const avail = await usersDb
    .availableId(response.data.user.id)
    .catch(e => console.log('Error checking for availability', e))

  if (avail) {
    const id = await usersDb
      .registerUser(response.data)
      .catch(e => console.log('error creating new user!', e))
  }
  res
    .status(200)
    .send({ data: response.data, s_queue: student, t_queue: teacher })
})

router.post('/scores', (req, res) => {
  const { user } = req.body
  const scores = usersDb.findScores(user)

  res.status(200).send(scores)
})

module.exports = router
