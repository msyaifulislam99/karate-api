'use strict';

const BaseModel = use('App/Models/BaseModel');

class Score extends BaseModel {
  match() {
    return this.belongsTo('App/Models/Match');
  }

  judge() {
    return this.belongsTo('App/Models/User');
  }
}

module.exports = Score;
