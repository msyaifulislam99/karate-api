'use strict';

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const BaseModel = use('App/Models/BaseModel');

class Competitor extends BaseModel {
  static boot() {
    super.boot();

    this.addTrait('Media');
  }

  async getImage() {
    const media = await this.getMedia();
    return media ? media.getUrl() : null;
  }

  event() {
    return this.belongsTo('App/Models/Event');
  }
}

module.exports = Competitor;
