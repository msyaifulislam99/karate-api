'use strict';

const BumblebeeTransformer = use('Bumblebee/Transformer');

/**
 * EventTransformer class
 *
 * @class EventTransformer
 * @constructor
 */
class EventTransformer extends BumblebeeTransformer {
  static get availableInclude() {
    return ['competitors'];
  }

  /**
   * This method is used to transform the data.
   */
  async transform(model) {
    return { ...model.toJSON(), image: await model.getImage() };
  }

  async includeCompetitors(model) {
    const competitors = await model.getRelated('competitors');

    return this.collection(competitors, 'CompetitorTransformer');
  }
}

module.exports = EventTransformer;
