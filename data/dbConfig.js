const knex = require('knex')
const knexConfig = require('../knexfile.js')

const mode = process.env.mode || 'development'

module.exports = knex(knexConfig[mode])
