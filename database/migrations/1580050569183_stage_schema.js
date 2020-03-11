'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class StageSchema extends Schema {
  up() {
    this.create('stages', table => {
      table
        .uuid('id')
        .primary()
        .defaultTo(this.db.raw('uuid_generate_v4()'));
      table.string('name', 100).notNullable();
      table.float('score');
      table.string('athlete', 100);
      table.string('contingen', 100);
      table.string('class', 100);
      table.string('genre', 100);
      table.timestamps();
    });
  }

  down() {
    this.drop('stages');
  }
}

module.exports = StageSchema;
