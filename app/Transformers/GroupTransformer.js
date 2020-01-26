'use strict';

const BumblebeeTransformer = use('Bumblebee/Transformer');

/**
 * GroupTransformer class
 *
 * @class GroupTransformer
 * @constructor
 */
class GroupTransformer extends BumblebeeTransformer {
  /**
   * This method is used to transform the data.
   */
  transform(model) {
    return { ...model.toJSON() };
  }
}

module.exports = GroupTransformer;
