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
    return ['competitor', 'scores'];
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

  async includeScores(model) {
    const scores = await model.getRelated('scores');

    return this.collection(scores, 'ScoreTransformer');
  }
}

module.exports = MatchTransformer;
