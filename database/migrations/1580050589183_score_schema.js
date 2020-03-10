'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class ScoreSchema extends Schema {
  up() {
    this.create('scores', table => {
      table
        .uuid('id')
        .primary()
        .defaultTo(this.db.raw('uuid_generate_v4()'));
      table.uuid('stage_id');
      table.uuid('judge_id');
      table.float('tech').notNullable();
      table.float('ath').notNullable();
      table.string('status_tech', 50);
      table.string('status_ath', 50);
      table.string('status', 50);
      table.timestamps();

      table
        .foreign('stage_id')
        .references('id')
        .on('stages')
        .onDelete('cascade');
      table
        .foreign('judge_id')
        .references('id')
        .on('users')
        .onDelete('cascade');
    });
  }

  down() {
    this.drop('scores');
  }
}

module.exports = ScoreSchema;
