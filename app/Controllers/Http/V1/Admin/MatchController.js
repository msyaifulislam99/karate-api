'use strict';

const { validateAll } = use('Validator');
const messages = use('App/Library/Validator/Messages');
const Group = use('App/Models/Group');
const Event = use('App/Models/Event');
const Constants = use('App/Library/Helpers/Constants');

class MatchController {
  async Index({ transform, params }) {
    const event = await Event.findOrFail(params.idEvent);

    const matches = await event.matches().fetch();

    return transform.collection(matches, 'MatchTransformer');
  }

  async Show({ transform, params }) {
    const event = await Event.findOrFail(params.idEvent);

    const matches = await event
      .matches()
      .where('id', '=', params.id)
      .fetch();

    return transform.collection(matches, 'MatchTransformer');
  }

  async Store({ transform, request, response, params }) {
    const rules = {
      id_competitors: 'required|array'
    };

    const validation = await validateAll(request.all(), rules, messages);
    if (validation.fails()) {
      return response.errorInvalid(validation);
    }

    const group = await Group.findOrFail(params.idGroup);
    await group.matches().delete();

    const data = [];
    // insert many
    for (const category of request.input('id_competitors') || []) {
      data.push({ group_id: params.idGroup, competitor_id: category, status: Constants.MATCH.STATUS_ACTIVE });
    }

    await group.matches().createMany(data);

    return transform.item(group, 'GroupTransformer');
  }
}

module.exports = MatchController;
