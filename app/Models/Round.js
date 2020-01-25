'use strict';

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const BaseModel = use('App/Models/BaseModel');

class Round extends BaseModel {
  event() {
    return this.belongsTo('App/Models/Event');
  }
}

module.exports = Round;
