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
  async transform(model) {
    return { ...model.toJSON(), image: await model.getImage() };
  }
}

module.exports = JudgeTransformer;
