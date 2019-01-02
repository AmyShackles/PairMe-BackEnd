// User-module relation (which users have which modules)
// id - increments
// user_id - foreign key to id in users table
// module_id - foregin key to id in module table
// ask_beacon - required, boolean, default false
// offer_beacon - required, boolean, default false

exports.up = function(knex, Promise) {
  return knex.schema.createTable('users_topics_join', tbl => {
    tbl.increments();
    tbl.integer('user_id').unsigned().notNullable();
    tbl.foreign('user_id').references('id').inTable('users').onDelete('CASCADE');
    tbl.integer('topic_id').unsigned().notNullable();
    tbl.foreign('topic_id').references('id').inTable('topics').onDelete('CASCADE');
    tbl.boolean('ask_beacon').notNullable().defaultTo(false);
    tbl.boolean('offer_beacon').notNullable().defaultTo(false);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('users_topics_join');
};
