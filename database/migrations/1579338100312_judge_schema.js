'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class JudgeSchema extends Schema {
  up() {
    this.create('judges', table => {
      table
        .uuid('id')
        .primary()
        .defaultTo(this.db.raw('uuid_generate_v4()'));
      table.string('name', 100).notNullable();
      table.string('gender', 10);
      table.date('birthday');
      table.string('country');
      table.timestamps();
    });
  }

  down() {
    this.drop('judges');
  }
}

module.exports = JudgeSchema;
