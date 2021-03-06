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
  console.log('topic:', topic, 'user:', user)
  const topic_str = `${topic}score`
  const score = await db('users')
    .select(topic_str)
    .where('id', user)
    .catch(e => console.log('error fetching score', e))

  await db('users')
    .where('id', user)
    .update(topic_str, score + 10)
    .catch(e => console.log('error when incrementing', e))
}

// true if usernam[topic_str][ is not in database
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
    .select('jsscore', 'reactscore', 'cssscore', 'pythonscore')
    .catch(e => console.log('Error getting scores!!', e))
  return result
}
