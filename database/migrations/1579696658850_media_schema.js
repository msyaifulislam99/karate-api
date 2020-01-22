'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class MediaSchema extends Schema {
  up() {
    this.create('media', table => {
      table.increments();
      table.string('model_type', 50);
      table.string('model_id', 50);
      table.string('name', 200);
      table.string('file_name', 200);
      table.string('mime_type', 50);
      table.string('disk', 50);
      table.integer('size');
      table.timestamps();
    });
  }

  down() {
    this.drop('media');
  }
}

module.exports = MediaSchema;
