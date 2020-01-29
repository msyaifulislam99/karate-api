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
    return ['competitors', 'rounds'];
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

  async includeRounds(model) {
    const rounds = await model.getRelated('rounds');

    return this.collection(rounds, 'RoundTransformer');
  }
}

module.exports = EventTransformer;
