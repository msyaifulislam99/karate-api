'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class RoundSchema extends Schema {
  up() {
    this.create('rounds', table => {
      table
        .uuid('id')
        .primary()
        .defaultTo(this.db.raw('uuid_generate_v4()'));
      table.uuid('event_id');
      table.string('title', 100).notNullable();
      table.string('status', 50).notNullable();
      table.timestamps();

      table
        .foreign('event_id')
        .references('id')
        .on('events')
        .onDelete('cascade');
    });
  }

  down() {
    this.drop('rounds');
  }
}

module.exports = RoundSchema;
