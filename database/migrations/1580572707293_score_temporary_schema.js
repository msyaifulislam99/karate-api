'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class ScoreTemporarySchema extends Schema {
  up() {
    this.create('score_temporaries', table => {
      table
        .uuid('id')
        .primary()
        .defaultTo(this.db.raw('uuid_generate_v4()'));
      table.uuid('judge_id');
      table.uuid('event_id');
      table.float('tech').notNullable();
      table.float('ath').notNullable();
      table.string('status_tech', 50);
      table.string('status_ath', 50);
      table.string('status', 50);
      table.timestamps();

      table
        .foreign('event_id')
        .references('id')
        .on('events')
        .onDelete('cascade');

      table
        .foreign('judge_id')
        .references('id')
        .on('users')
        .onDelete('cascade');
    });
  }

  down() {
    this.drop('score_temporaries');
  }
}

module.exports = ScoreTemporarySchema;
