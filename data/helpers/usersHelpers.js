const db = require("../dbConfig.js")

const bcrypt = require("bcryptjs")

module.exports = {
  getUsers,
  registerUser,
  availableEmail,
  availableUsername,
  availableHandle
}

// return all users, empty array if no users
function getUsers() {
  return db("users").select("id", "username", "email", "slack_handle")
}

// register new user if valid
async function registerUser(user) {
  const hash = await bcrypt
    .hash(user.password, 12)
    .catch(e => console.log("hashing function error!"))
  user.username = user.username.toLowerCase()
  user.email = user.email.toLowerCase()
  user.slack_handle = user.slack_handle.toLowerCase()
  user.password = hash

  // no catch to let the error bubble up for the "parent" try / catch block
  const id = await db("users").insert(user)
  return id
}

// true if username is not in database
function availableUsername(name) {
  name = name.toLowerCase()
  return db("users")
    .where({ username: name })
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
  return db("users")
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
  return db("users")
    .where({ slack_handle: name })
    .then(result => {
      if (result.length) {
        return false
      } else {
        return true
      }
    })
}
