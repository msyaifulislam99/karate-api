'use strict';

const BumblebeeTransformer = use('Bumblebee/Transformer');

/**
 * EventTransformer class
 *
 * @class EventTransformer
 * @constructor
 */
class EventTransformer extends BumblebeeTransformer {
  /**
   * This method is used to transform the data.
   */
  transform(model) {
    return { ...model.toJSON() };
  }
}

module.exports = EventTransformer;
