// lambda modules
// id - increments
// name - required, unique, 255

exports.up = function(knex, Promise) {
  return knex.schema.createTable('topics', tbl => {
    tbl.increments();
    tbl.string('name', 255).notNullable().unique();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('topics');
};
