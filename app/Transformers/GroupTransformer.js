'use strict';

const BumblebeeTransformer = use('Bumblebee/Transformer');

/**
 * GroupTransformer class
 *
 * @class GroupTransformer
 * @constructor
 */
class GroupTransformer extends BumblebeeTransformer {
  static get availableInclude() {
    return ['matches'];
  }

  /**
   * This method is used to transform the data.
   */
  transform(model) {
    return { ...model.toJSON() };
  }

  async includeMatches(model) {
    const groups = await model.getRelated('matches');

    return this.collection(groups, 'MatchTransformer');
  }
}

module.exports = GroupTransformer;
