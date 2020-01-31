'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class UserSchema extends Schema {
  up() {
    this.create('users', table => {
      table
        .uuid('id')
        .primary()
        .defaultTo(this.db.raw('uuid_generate_v4()'));
      table.string('username', 100).unique();
      table.string('password');
      table.string('phone', 20);
      table.string('email', 100).notNullable();
      table.string('name', 100).notNullable();
      table.string('gender', 10).notNullable();
      table.date('birthday').notNullable();
      table.string('address');
      table.string('address2');
      table
        .integer('city_id')
        .unsigned()
        .index();
      table
        .integer('province_id')
        .unsigned()
        .index();
      table.string('zip_code', 10);
      table.string('provider');
      table.string('status', 50);
      table.string('reset_token', 50);
      table.string('verification_token', 50);
      table.decimal('credit', 15, 2).defaultTo(0);
      table.timestamp('verified_at');
      table.timestamp('last_login_at');
      table.timestamps();
    });
  }

  down() {
    this.drop('users');
  }
}

module.exports = UserSchema;
