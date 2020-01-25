'use strict';

const { validateAll } = use('Validator');
const messages = use('App/Library/Validator/Messages');
const Query = use('Query');
const Round = use('App/Models/Round');
const Event = use('App/Models/Event');
const RoundTransformer = use('App/Transformers/RoundTransformer');
const RequestException = use('App/Exceptions/RequestException');
const Constants = use('App/Library/Helpers/Constants');

class RoundController {
  async Index({ transform, request, params }) {
    const query_search = new Query(request, { order: 'title' });
    const order = query_search.order();
    const event = await this.getEvent(params.idEvent);
    const rounds = await event
      .rounds()
      .where(query_search.search(['title']))
      .orderBy(order.column, order.direction)
      .paginate(...request.getPage());

    return transform.paginate(rounds, RoundTransformer);
  }

  async Show({ params, transform }) {
    const round = await this.getRound(params);
    return transform.item(round, RoundTransformer);
  }

  async Store({ transform, request, response, params }) {
    const rules = {
      title: 'required|string'
    };

    const validation = await validateAll(request.all(), rules, messages);
    if (validation.fails()) {
      return response.errorInvalid(validation);
    }

    const payload = request.only(['title']);

    const event = await this.getEvent(params.idEvent);
    const round = await Round.create({ ...payload, status: Constants.GROUP.STATUS_READY });
    await round.event().associate(event);

    return transform.item(round, RoundTransformer);
  }

  async Update({ params, request, response, transform }) {
    const rules = {
      title: 'required|string',
      status: 'required|in:active,done,rematch'
    };
    const validation = await validateAll(request.all(), rules, messages);
    if (validation.fails()) {
      return response.errorInvalid(validation);
    }

    const payload = request.only(['title', 'status']);

    const round = await this.getRound(params);
    round.merge(payload);
    await round.save();

    return transform.item(round, RoundTransformer);
  }

  async Destroy({ response, params }) {
    const round = await this.getRound(params);
    await round.delete();

    return response.noContent();
  }

  async getEvent(id) {
    const event = await Event.findOrFail(id);

    if (!event) {
      throw new RequestException('Event not found', 404);
    }

    return event;
  }

  async getRound(params) {
    const event = await this.getEvent(params.idEvent);
    const round = await event
      .rounds()
      .where('id', '=', params.id)
      .first();

    if (!round) {
      throw new RequestException('Round not found', 404);
    }

    return round;
  }
}

module.exports = RoundController;
