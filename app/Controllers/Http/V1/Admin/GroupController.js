'use strict';

const { validateAll } = use('Validator');
const messages = use('App/Library/Validator/Messages');
const Query = use('Query');
const Group = use('App/Models/Group');
const Round = use('App/Models/Round');
const GroupTransformer = use('App/Transformers/GroupTransformer');
const RequestException = use('App/Exceptions/RequestException');
const Constants = use('App/Library/Helpers/Constants');

class GroupController {
  async Index({ transform, request, params }) {
    const query_search = new Query(request, { order: 'name' });
    const order = query_search.order();
    const round = await this.getRound(params.idRound);
    const groups = await round
      .groups()
      .where(query_search.search(['name']))
      .orderBy(order.column, order.direction)
      .paginate(...request.getPage());

    return transform.paginate(groups, GroupTransformer);
  }

  async Show({ params, transform }) {
    const group = await this.getGroup(params);
    return transform.item(group, GroupTransformer);
  }

  async Store({ transform, request, response, params }) {
    const rules = {
      name: 'required|string'
    };

    const validation = await validateAll(request.all(), rules, messages);
    if (validation.fails()) {
      return response.errorInvalid(validation);
    }

    const payload = request.only(['name']);

    const round = await this.getRound(params.idRound);
    const group = await Group.create({ ...payload, status: Constants.GROUP.STATUS_READY });
    // return response.send(round);
    await group.round().associate(round);

    return transform.item(group, GroupTransformer);
  }

  async Update({ params, request, response, transform }) {
    const rules = {
      title: 'required|string',
      status: 'required|in:active,done,rematch,ready'
    };
    const validation = await validateAll(request.all(), rules, messages);
    if (validation.fails()) {
      return response.errorInvalid(validation);
    }

    const payload = request.only(['title', 'status']);

    const group = await this.getGroup(params);
    group.merge(payload);
    await group.save();

    return transform.item(group, GroupTransformer);
  }

  async Destroy({ response, params }) {
    const group = await this.getGroup(params);
    await group.delete();

    return response.noContent();
  }

  async getRound(id) {
    const round = await Round.findOrFail(id);

    if (!round) {
      throw new RequestException('Round not found', 404);
    }

    return round;
  }

  async getGroup(params) {
    const round = await this.getRound(params.idRound);
    const group = await round
      .groups()
      .where('id', '=', params.id)
      .first();

    if (!group) {
      throw new RequestException('Group not found', 404);
    }

    return group;
  }
}

module.exports = GroupController;
