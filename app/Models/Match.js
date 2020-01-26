'use strict';

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const BaseModel = use('App/Models/BaseModel');

class Match extends BaseModel {
  round() {
    return this.belongsTo('App/Models/Round');
  }

  competitor() {
    return this.belongsTo('App/Models/Competitor');
  }

  scores() {
    return this.hasMany('App/Models/Score');
  }
}

module.exports = Match;
