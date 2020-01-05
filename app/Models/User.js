'use strict';

const BaseModel = use('App/Models/BaseModel');
const Constants = use('App/Library/Helpers/Constants');

class User extends BaseModel {
  static boot() {
    super.boot();

    this.addTrait('@provider:Adonis/Acl/HasRole');
    this.addTrait('@provider:Adonis/Acl/HasPermission');

    this.addTrait('Media');
  }

  async getImage() {
    const media = await this.getMedia();
    return media ? media.getUrl() : null;
  }

  static get hidden() {
    return ['password', 'reset_token', 'verification_token'];
  }

  isActive() {
    return this.status === Constants.USER_STATUS_ACTIVE;
  }

  isVerified() {
    return this.verified_at !== null;
  }

  getRole(role = 'participant') {
    // Default Role is Customer
    const roles = Constants.USER_ROLES;
    const idx = roles.findIndex(k => k === role);
    return idx === -1 ? 3 : idx + 1;
  }

  tokens() {
    return this.hasMany('App/Models/Token');
  }
}

module.exports = User;
