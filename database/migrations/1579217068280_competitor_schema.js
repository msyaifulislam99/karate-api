'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class CompetitorSchema extends Schema {
  up() {
    this.create('competitors', table => {
      table
        .uuid('id')
        .primary()
        .defaultTo(this.db.raw('uuid_generate_v4()'));
      table.uuid('event_id');
      table.string('name', 100).notNullable();
      table.string('gender', 10);
      table.decimal('weight', 10, 2);
      table.string('contingen');
      table.string('type');
      table.date('birthday');
      table.string('country');
      table.timestamps();

      table
        .foreign('event_id')
        .references('id')
        .on('events')
        .onDelete('cascade');
    });
  }

  down() {
    this.drop('competitors');
  }
}

module.exports = CompetitorSchema;
