'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class GroupSchema extends Schema {
  up() {
    this.create('groups', table => {
      table
        .uuid('id')
        .primary()
        .defaultTo(this.db.raw('uuid_generate_v4()'));
      table.uuid('round_id');
      table.string('name', 100).notNullable();
      table.string('status', 50).notNullable();
      table.timestamps();

      table
        .foreign('round_id')
        .references('id')
        .on('rounds')
        .onDelete('cascade');
    });
  }

  down() {
    this.drop('groups');
  }
}

module.exports = GroupSchema;
