'use strict';

const BaseModel = use('App/Models/BaseModel');

class Judge extends BaseModel {
  static boot() {
    super.boot();

    this.addTrait('Media');
  }

  async getImage() {
    const media = await this.getMedia();
    return media ? media.getUrl() : null;
  }

  events() {
    return this.hasMany('App/Models/EventJudge');
  }
}

module.exports = Judge;
