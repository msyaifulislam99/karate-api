'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class EventJudgeSchema extends Schema {
  up() {
    this.create('event_judges', table => {
      table
        .uuid('id')
        .primary()
        .defaultTo(this.db.raw('uuid_generate_v4()'));
      table.uuid('event_id');
      table.uuid('judge_id');
      table.timestamps();

      table
        .foreign('event_id')
        .references('id')
        .on('events')
        .onDelete('cascade');
      table
        .foreign('judge_id')
        .references('id')
        .on('judges')
        .onDelete('cascade');
    });
  }

  down() {
    this.drop('event_judges');
  }
}

module.exports = EventJudgeSchema;
