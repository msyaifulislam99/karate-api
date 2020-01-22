'use strict';

const BaseModel = use('App/Models/BaseModel');

class EventJudge extends BaseModel {
  static get table() {
    return 'event_judges';
  }

  event() {
    return this.belongsTo('App/Models/Event');
  }

  judge() {
    return this.belongsTo('App/Models/Judge');
  }
}

module.exports = EventJudge;
