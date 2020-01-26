'use strict';

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class Group extends Model {
  round() {
    return this.belongsTo('App/Models/Round');
  }

  matches() {
    return this.hasMany('App/Models/Match');
  }
}

module.exports = Group;
