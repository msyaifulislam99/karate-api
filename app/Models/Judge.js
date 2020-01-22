'use strict';

const BaseModel = use('App/Models/BaseModel');

class Judge extends BaseModel {
  static boot() {
    super.boot();
  }

  events() {
    return this.hasMany('App/Models/EventJudge');
  }
}

module.exports = Judge;
