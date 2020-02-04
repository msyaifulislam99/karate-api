'use strict';

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const BaseModel = use('App/Models/BaseModel');

class ScoreTemporary extends BaseModel {
  event() {
    return this.belongsTo('App/Models/Event');
  }

  judge() {
    return this.belongsTo('App/Models/User');
  }
}

module.exports = ScoreTemporary;
