'use strict';

const BumblebeeTransformer = use('Bumblebee/Transformer');

/**
 * CompetitorTransformer class
 *
 * @class CompetitorTransformer
 * @constructor
 */
class CompetitorTransformer extends BumblebeeTransformer {
  static get availableInclude() {
    return ['event', 'match'];
  }

  /**
   * This method is used to transform the data.
   */
  async transform(model) {
    return { ...model.toJSON(), image: await model.getImage() };
  }

  includeEvent(model) {
    const event = model.getRelated('event');
    if (!event) {
      return this.null();
    }
    return this.item(event, 'EventTransformer');
  }

  includeMatch(model) {
    const event = model.getRelated('match');
    if (!event) {
      return this.null();
    }
    return this.item(event, 'MatchTransformer');
  }
}

module.exports = CompetitorTransformer;
