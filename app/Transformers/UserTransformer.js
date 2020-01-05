'use strict';

const BumblebeeTransformer = use('Bumblebee/Transformer');

/**
 * UserTransformer class
 *
 * @class UserTransformer
 * @constructor
 */
class UserTransformer extends BumblebeeTransformer {
  static get availableInclude() {
    return ['city', 'province'];
  }

  /**
   * This method is used to transform the data.
   */
  async transform(model) {
    const { password, reset_token, verification_token, ...payload } = model.toJSON();
    return { ...payload, roles: await model.getRoles(), image: await model.getImage() };
  }

  async transformWithSession(model) {
    const payload = await this.transform(model);
    return { ...payload, session: await model.getSessionStatus() };
  }

  includeCity(model) {
    const city = model.getRelated('city');
    if (!city) {
      this.null();
    }
    return this.item(city, 'CityTransformer');
  }

  includeProvince(model) {
    const province = model.getRelated('province');
    if (!province) {
      this.null();
    }
    return this.item(province, 'ProvinceTransformer');
  }
}

module.exports = UserTransformer;
