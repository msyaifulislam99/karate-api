'use strict';

const BumblebeeTransformer = use('Bumblebee/Transformer');

/**
 * StageTransformer class
 *
 * @class StageTransformer
 * @constructor
 */
class StageTransformer extends BumblebeeTransformer {
  /**
   * This method is used to transform the data.
   */
  transform(model) {
    return { ...model.toJSON() };
  }
}

module.exports = StageTransformer;
