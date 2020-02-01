'use strict';

const { validateAll } = use('Validator');
const messages = use('App/Library/Validator/Messages');
const Query = use('Query');
const Competitor = use('App/Models/Competitor');
const Event = use('App/Models/Event');
const CompetitorTransformer = use('App/Transformers/CompetitorTransformer');
const MediaTransformer = use('App/Transformers/MediaTransformer');
const RequestException = use('App/Exceptions/RequestException');
const Constants = use('App/Library/Helpers/Constants');

class CompetitorController {
  async Index({ transform, request, params }) {
    const query_search = new Query(request, { order: 'name' });
    const order = query_search.order();
    const event = await this.getEvent(params.idEvent);
    const competitors = await event
      .competitors()
      .where(query_search.search(['name']))
      .orderBy(order.column, order.direction)
      .paginate(...request.getPage());

    return transform.paginate(competitors, CompetitorTransformer);
  }

  async IndexGroup({ transform, request, params }) {
    const query_search = new Query(request, { order: 'name' });
    const order = query_search.order();
    const event = await this.getEvent(params.idEvent);
    const competitors = await event
      .competitors()
      .where(query_search.search(['name']))
      .orderBy(order.column, order.direction)
      .paginate(...request.getPage());

    return transform.paginate(competitors, CompetitorTransformer);
  }

  async Show({ params, transform }) {
    const competitor = await this.getCompetitor(params);
    return transform.item(competitor, CompetitorTransformer);
  }

  async Store({ transform, request, response, params }) {
    const rules = {
      name: 'required|string'
    };

    const validation = await validateAll(request.all(), rules, messages);
    if (validation.fails()) {
      return response.errorInvalid(validation);
    }

    const payload = request.only(['name', 'gender', 'birthday', 'country', 'weight', 'type', 'contingen']);

    const event = await this.getEvent(params.idEvent);
    const competitor = await Competitor.create({ ...payload, status: Constants.COMPETITOR.STATUS_ACTIVE });
    await competitor.event().associate(event);

    return transform.item(competitor, CompetitorTransformer);
  }

  async Update({ params, request, response, transform }) {
    const rules = {
      name: 'required|string',
      status: 'required|in:active,eliminated'
    };
    const validation = await validateAll(request.all(), rules, messages);
    if (validation.fails()) {
      return response.errorInvalid(validation);
    }

    const payload = request.only(['name', 'gender', 'birthday', 'country', 'weight', 'type', 'contingen', 'status']);

    const competitor = await this.getCompetitor(params);
    competitor.merge(payload);
    await competitor.save();

    return transform.item(competitor, CompetitorTransformer);
  }

  async Destroy({ response, params }) {
    const competitor = await this.getCompetitor(params);
    await competitor.delete();

    return response.noContent();
  }

  async StoreImage({ params, request, response, transform }) {
    const competitor = await this.getCompetitor(params);

    try {
      const image = request.file('image', {
        types: ['image'],
        size: '2mb',
        extnames: ['png', 'jpg', 'jpeg']
      });
      // one event one image
      await competitor.removeMedias();
      const media = await competitor.saveMedia(image);
      return transform.item(media, MediaTransformer);
    } catch (error) {
      return response.errorBadRequest(error.message);
    }
  }

  async DestroyImage({ params, response }) {
    const competitor = await this.getCompetitor(params);
    await competitor.removeMedias();

    return response.noContent();
  }

  async getEvent(id) {
    const event = await Event.findOrFail(id);

    if (!event) {
      throw new RequestException('Event not found', 404);
    }

    return event;
  }

  async getCompetitor(params) {
    const event = await this.getEvent(params.idEvent);
    const competitor = await event
      .competitors()
      .where('id', '=', params.id)
      .first();

    if (!competitor) {
      throw new RequestException('Competitor not found', 404);
    }

    return competitor;
  }
}

module.exports = CompetitorController;
