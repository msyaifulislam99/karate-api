'use strict';

const { validateAll } = use('Validator');
const messages = use('App/Library/Validator/Messages');
const Query = use('Query');
const Stage = use('App/Models/Stage');
const StageTransformer = use('App/Transformers/StageTransformer');

class StageController {
  async Index({ transform, request }) {
    const query_search = new Query(request, { order: 'name' });
    const order = query_search.order();
    const query = Stage.query();

    query.where(query_search.search(['name']));
    query.orderBy(order.column, order.direction);

    const stages = await query.paginate(...request.getPage());
    return transform.paginate(stages, StageTransformer);
  }

  async Show({ params, transform }) {
    const stage = await Stage.findOrFail(params.id);
    return transform.item(stage, StageTransformer);
  }

  async Store({ transform, request, response }) {
    const rules = {
      name: 'required|string',
      athlete: 'string',
      contingen: 'string'
    };

    const validation = await validateAll(request.all(), rules, messages);
    if (validation.fails()) {
      return response.errorInvalid(validation);
    }

    const payload = request.only(['name', 'athlete', 'contingen']);

    const stage = await Stage.create({ ...payload });

    return transform.item(stage, StageTransformer);
  }

  async Update({ params, request, response, transform }) {
    const rules = {
      name: 'required|string',
      athlete: 'string',
      contingen: 'string'
    };

    const validation = await validateAll(request.all(), rules, messages);
    if (validation.fails()) {
      return response.errorInvalid(validation);
    }

    const payload = request.only(['name', 'athlete', 'contingen']);

    const stage = await Stage.findOrFail(params.id);
    stage.merge(payload);
    await stage.save();

    return transform.item(stage, StageTransformer);
  }

  async Destroy({ response, params }) {
    const stage = await Stage.findOrFail(params.id);
    await stage.delete();

    return response.noContent();
  }
}

module.exports = StageController;
