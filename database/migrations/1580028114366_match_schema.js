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
      table.uuid('group_id');
      table.uuid('competitor_id');
      table.timestamps();

      table
        .foreign('group_id')
        .references('id')
        .on('groups')
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
