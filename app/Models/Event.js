'use strict';

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const BaseModel = use('App/Models/BaseModel');

class Event extends BaseModel {
  static boot() {
    super.boot();

    this.addTrait('@provider:Lucid/Slugify', {
      fields: { slug: 'name' },
      strategy: 'shortId'
    });

    this.addTrait('Media');
  }

  async getImage() {
    const media = await this.getMedia();
    return media ? media.getUrl() : null;
  }

  competitors() {
    return this.hasMany('App/Models/Competitor');
  }

  rounds() {
    return this.hasMany('App/Models/Round');
  }

  scores() {
    return this.hasMany('App/Models/ScoreTemporary');
  }

  matches() {
    return this.hasMany('App/Models/Match');
  }
}

module.exports = Event;
