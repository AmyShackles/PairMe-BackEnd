const db = require('../dbConfig.js')

module.exports = {
  getUsers,
  registerUser,
  availableId,
  updatePoints
}

// return all users, empty array if no users
function getUsers() {
  return db('users').select('*')
}

// register new user if valid
async function registerUser(data) {
  const { access_token } = data
  const { id, name, email, avatar_512 } = data.user
  const user = {
    id,
    username: name,
    email,
    avatar: avatar_512,
    access_token
  }

  // no catch to let the error bubble up for the "parent" try / catch block
  const u_id = await db('users').insert(user)
  return u_id
}

async function updatePoints(user, topic) {
  const topic_str = topic + '-score'
  await db('users')
    .where({ id: user })
    .increment({ [topic_str]: 10 })
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
