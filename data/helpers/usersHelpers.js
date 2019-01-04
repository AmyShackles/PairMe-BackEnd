const db = require('../dbConfig.js')

const bcrypt = require('bcryptjs')

module.exports = {
  getUsers,
  registerUser,
  availableEmail,
  availableUsername,
  availableHandle
}

// return all users, empty array if no users
function getUsers() {
  return db('users').select('id', 'username', 'email', 'slack_handle')
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

// true if username is not in database
function availableId(id) {
  return db('users')
    .where({ id })
    .then(result => {
      if (result.length) {
        return false
      } else {
        return true
      }
    })
}

// true if email not in database
function availableEmail(name) {
  name = name.toLowerCase()
  return db('users')
    .where({ email: name })
    .then(result => {
      if (result.length) {
        return false
      } else {
        return true
      }
    })
}

// true if email not in database
function availableHandle(name) {
  name = name.toLowerCase()
  return db('users')
    .where({ slack_handle: name })
    .then(result => {
      if (result.length) {
        return false
      } else {
        return true
      }
    })
}
