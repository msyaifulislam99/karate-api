'use strict';

const { validateAll } = use('Validator');
const messages = use('App/Library/Validator/Messages');
const Group = use('App/Models/Group');
const Constants = use('App/Library/Helpers/Constants');

class MatchController {
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
