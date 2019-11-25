'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class TokensSchema extends Schema {
  up() {
    this.create('tokens', table => {
      table
        .uuid('id')
        .primary()
        .defaultTo(this.db.raw('uuid_generate_v4()'));
      table
        .string('token', 40)
        .notNullable()
        .unique();
      table.string('type', 100);
      table.boolean('is_revoked').defaultTo(false);
      table.timestamps();

      table
        .uuid('user_id')
        .references('id')
        .inTable('users')
        .onDelete('CASCADE');
    });
  }

  down() {
    this.drop('tokens');
  }
}

module.exports = TokensSchema;
