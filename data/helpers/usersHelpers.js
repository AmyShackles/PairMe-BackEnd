const db = require('../dbConfig.js')

module.exports = {
  getUsers,
  registerUser,
  availableId,
  updatePoints,
  findScores
}

// return all users, empty array if no users
function getUsers() {
  return db('users').select('*')
}

// register new user if valid
async function registerUser(data) {
  const { access_token } = data
  const { id, name, email, image_512 } = data.user
  const user = {
    id,
    username: name,
    email,
    avatar: image_512,
    access_token
  }

  // no catch to let the error bubble up for the "parent" try / catch block
  const u_id = await db('users').insert(user)
  return u_id
}

async function updatePoints(user, topic) {
  const topic_str = topic + '-score'
  console.log(topic_str)
  await db('users')
    .where({ id: user })
    .increment(topic_str, 10)
}

// true if username is not in database
function availableId(user) {
  return db('users')
    .where({ id: user })
    .then(result => {
      if (result.length) {
        return false
      } else {
        return true
      }
    })
}

async function findScores(user) {
  const result = await db('users')
    .where({ id: user })
    .select('js-score', 'react-score', 'css-score', 'python-score')
    .catch(e => console.log('Error getting scores!!', e))
  return result
}
