'use strict';

const BumblebeeTransformer = use('Bumblebee/Transformer');

/**
 * JudgeTransformer class
 *
 * @class JudgeTransformer
 * @constructor
 */
class JudgeTransformer extends BumblebeeTransformer {
  /**
   * This method is used to transform the data.
   */
  transform(model) {
    return { ...model.toJSON() };
  }
}

module.exports = JudgeTransformer;
