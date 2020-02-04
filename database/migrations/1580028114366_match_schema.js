'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class MatchSchema extends Schema {
  up() {
    this.create('matches', table => {
      table
        .uuid('id')
        .primary()
        .defaultTo(this.db.raw('uuid_generate_v4()'));
      table.float('score');
      table.string('status', 50);
      table.string('information', 50);
      table.uuid('competitor_id');
      table.uuid('event_id');
      table.timestamps();

      table
        .foreign('event_id')
        .references('id')
        .on('events')
        .onDelete('cascade');

      table
        .foreign('competitor_id')
        .references('id')
        .on('competitors')
        .onDelete('cascade');
    });
  }

  down() {
    this.drop('matches');
  }
}

module.exports = MatchSchema;
