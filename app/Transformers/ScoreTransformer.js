'use strict';

const BumblebeeTransformer = use('Bumblebee/Transformer');

/**
 * ScoreTransformer class
 *
 * @class ScoreTransformer
 * @constructor
 */
class ScoreTransformer extends BumblebeeTransformer {
  /**
   * This method is used to transform the data.
   */
  transform(model) {
    return { ...model.toJSON() };
  }
}

module.exports = ScoreTransformer;
