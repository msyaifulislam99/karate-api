'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class ContingenSchema extends Schema {
  up() {
    this.create('contingens', table => {
      table
        .uuid('id')
        .primary()
        .defaultTo(this.db.raw('uuid_generate_v4()'));
      table.string('name', 100).notNullable();
      table.string('gender', 10);
      table.decimal('weight', 10, 2);
      table.string('contingen');
      table.string('class');
      table.string('type');
      table.date('birthday');
      table.string('country');
      table.timestamps();
    });
  }

  down() {
    this.drop('contingens');
  }
}

module.exports = ContingenSchema;
