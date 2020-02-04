'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class EventSchema extends Schema {
  up() {
    this.create('events', table => {
      table
        .uuid('id')
        .primary()
        .defaultTo(this.db.raw('uuid_generate_v4()'));
      table.string('name', 100).notNullable();
      table.string('class');
      table.string('slug');
      table.text('description');
      table.date('date');
      table.string('location', 100);
      table.string('status', 20);
      table.timestamps();
    });
  }

  down() {
    this.drop('events');
  }
}

module.exports = EventSchema;
