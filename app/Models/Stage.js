'use strict';

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class Stage extends Model {
  scores() {
    return this.hasMany('App/Models/Score');
  }
}

module.exports = Stage;
