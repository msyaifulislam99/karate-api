'use strict';

const Schema = use('Schema');

class PermissionUserTableSchema extends Schema {
  up() {
    this.create('permission_user', table => {
      table.increments();
      table
        .integer('permission_id')
        .unsigned()
        .index();
      table.uuid('user_id').index();
      table.timestamps();

      table
        .foreign('permission_id')
        .references('id')
        .on('permissions')
        .onDelete('cascade');
      table
        .foreign('user_id')
        .references('id')
        .on('users')
        .onDelete('cascade');
    });
  }

  down() {
    this.drop('permission_user');
  }
}

module.exports = PermissionUserTableSchema;
