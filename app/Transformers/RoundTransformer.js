'use strict';

const BumblebeeTransformer = use('Bumblebee/Transformer');

/**
 * RoundTransformer class
 *
 * @class RoundTransformer
 * @constructor
 */
class RoundTransformer extends BumblebeeTransformer {
  static get availableInclude() {
    return ['event', 'groups'];
  }

  /**
   * This method is used to transform the data.
   */
  transform(model) {
    return { ...model.toJSON() };
  }

  includeEvent(model) {
    const event = model.getRelated('event');
    if (!event) {
      return this.null();
    }
    return this.item(event, 'EventTransformer');
  }

  async includeGroups(model) {
    const groups = await model.getRelated('groups');

    return this.collection(groups, 'GroupTransformer');
  }
}

module.exports = RoundTransformer;
