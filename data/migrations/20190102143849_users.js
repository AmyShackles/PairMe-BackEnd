// table of all register users
// id - increments
// username - required, unique, 255
// password - required, 255 (hashed)
// email - required, unique, 255

exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', tbl => {
    tbl
      .string('id')
      .notNullable()
      .primary()

    tbl
      .string('username', 255)
      .notNullable()
      .unique()

    tbl
      .string('email', 255)
      .notNullable()
      .unique()

    tbl.string('avatar', 1024).unique()

    tbl.integer('reactscore').defaultTo(0)
    tbl.integer('pythonscore').defaultTo(0)
    tbl.integer('cssscore').defaultTo(0)
    tbl.integer('jsscore').defaultTo(0)

    tbl.string('access_token').unique()
  })
}

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('users')
}
