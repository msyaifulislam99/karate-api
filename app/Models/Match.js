'use strict';

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class Match extends Model {
  round() {
    return this.belongsTo('App/Models/Round');
  }

  competitor() {
    return this.belongsTo('App/Models/Competitor');
  }
}

module.exports = Match;
