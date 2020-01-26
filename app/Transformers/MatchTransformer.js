'use strict';

const BumblebeeTransformer = use('Bumblebee/Transformer');

/**
 * MatchTransformer class
 *
 * @class MatchTransformer
 * @constructor
 */
class MatchTransformer extends BumblebeeTransformer {
  static get availableInclude() {
    return ['competitor'];
  }

  /**
   * This method is used to transform the data.
   */
  transform(model) {
    return { ...model.toJSON() };
  }

  includeCompetitor(model) {
    const competitor = model.getRelated('competitor');
    if (!competitor) {
      return this.null();
    }
    return this.item(competitor, 'CompetitorTransformer');
  }
}

module.exports = MatchTransformer;
