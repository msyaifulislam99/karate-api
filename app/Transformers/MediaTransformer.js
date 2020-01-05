'use strict';

const BumblebeeTransformer = use('Bumblebee/Transformer');

/**
 * MediaTransformer class
 *
 * @class MediaTransformer
 * @constructor
 */
class MediaTransformer extends BumblebeeTransformer {
  /**
   * This method is used to transform the data.
   */
  transform(model) {
    return { ...model.toJSON(), url: model.getUrl() };
  }
}

module.exports = MediaTransformer;
