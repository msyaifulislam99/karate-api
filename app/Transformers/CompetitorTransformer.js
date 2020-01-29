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
    return ['event'];
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
}

module.exports = CompetitorTransformer;
