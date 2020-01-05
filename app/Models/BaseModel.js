'use strict';

const Model = use('Model');
const uuid = use('uuid');

class BaseModel extends Model {
  static get incrementing() {
    return false;
  }

  static boot() {
    super.boot();

    this.addHook('beforeCreate', async userInstance => {
      userInstance.primaryKeyValue = uuid.v4();
    });
  }

  // eslint-disable-next-line no-underscore-dangle
  static _bootIfNotBooted() {
    if (this.name !== 'BaseModel') {
      // eslint-disable-next-line no-underscore-dangle
      super._bootIfNotBooted();
    }
  }
}

module.exports = BaseModel;
