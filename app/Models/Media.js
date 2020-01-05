'use strict';

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');
const Env = use('Env');
const { kebabCase } = use('lodash');

class Media extends Model {
  static get table() {
    return 'media';
  }

  getUrl() {
    const type = kebabCase(this.model_type);
    return `${Env.get('APP_URL')}/media/${type}/${this.file_name}`;
  }
}

module.exports = Media;
