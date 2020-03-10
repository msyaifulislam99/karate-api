'use strict';

const BaseModel = use('App/Models/BaseModel');
const _ = use('lodash');

class Score extends BaseModel {
  static calculate(data = [], type = 'tech', judge_count = 7) {
    if (data.length < 1) {
      return 0;
    }
    let iterate = 0;
    if (judge_count === 5) {
      iterate = 1;
    }
    if (judge_count === 7) {
      iterate = 2;
    }

    // calculation process
    for (let index = 0; index < iterate; index += 1) {
      const max_score = _.maxBy(data, type);
      const index_max = _.findIndex(data, max_score);
      data.splice(index_max, 1);
    }

    for (let index = 0; index < iterate; index += 1) {
      const min_score = _.minBy(data, type);
      const index_min = _.findIndex(data, min_score);
      data.splice(index_min, 1);
    }

    const sum = _.sumBy(data, type);

    if (type === 'tech') {
      return sum * 0.7;
    }
    if (type === 'ath') {
      return sum * 0.3;
    }
    return 0;
  }

  match() {
    return this.belongsTo('App/Models/Match');
  }

  judge() {
    return this.belongsTo('App/Models/User');
  }

  stage() {
    return this.belongsTo('App/Models/Stage');
  }
}

module.exports = Score;
