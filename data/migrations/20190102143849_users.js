// table of all register users
// id - increments
// username - required, unique, 255
// password - required, 255 (hashed)
// email - required, unique, 255

exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', tbl => {
    tbl.increments();
    tbl.string('username', 255).notNullable().unique();
    tbl.string('password', 255).notNullable();
    tbl.string('email', 255).notNullable().unique();
    tbl.string('slack_handle', 255).notNullable().unique();
  });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('users');
};
