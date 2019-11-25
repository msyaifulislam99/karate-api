"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class UserSchema extends Schema {
  up() {
    this.create("users", table => {
      table.increments();
      table
        .string("username", 80)
        .notNullable()
        .unique();
      table.string("password", 60).notNullable();
      table.string("name", 100).notNullable();
      table.string("identity_number", 50);
      table.string("identity_type", 50);
      table.date("birthday").notNullable();
      table.string("status", 50);
      table.timestamps();
    });
  }

  down() {
    this.drop("users");
  }
}

module.exports = UserSchema;
