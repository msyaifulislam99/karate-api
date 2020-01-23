'use strict';

const { validateAll } = use('Validator');
const messages = use('App/Library/Validator/Messages');
const Query = use('Query');
const Event = use('App/Models/Event');
const EventTransformer = use('App/Transformers/EventTransformer');
const MediaTransformer = use('App/Transformers/MediaTransformer');

class EventController {
  async Index({ transform, request }) {
    const query_search = new Query(request, { order: 'name' });
    const order = query_search.order();
    const query = Event.query();

    query.where(query_search.search(['name', 'class']));
    query.orderBy(order.column, order.direction);

    const events = await query.paginate(...request.getPage());
    return transform.paginate(events, EventTransformer);
  }

  async Show({ params, transform }) {
    const event = await Event.findOrFail(params.id);
    return transform.item(event, EventTransformer);
  }

  async Store({ transform, request, response }) {
    const rules = {
      name: 'required|string',
      class: 'required|string',
      description: 'string',
      location: 'string',
      date: 'date'
    };

    const validation = await validateAll(request.all(), rules, messages);
    if (validation.fails()) {
      return response.errorInvalid(validation);
    }

    const payload = request.only(['name', 'class', 'description', 'location', 'date']);

    const event = await Event.create({ ...payload });

    return transform.item(event, EventTransformer);
  }

  async Update({ params, request, response, transform }) {
    const rules = {
      name: 'required|string',
      class: 'required|string',
      description: 'string',
      location: 'string',
      date: 'date'
    };
    const validation = await validateAll(request.all(), rules, messages);
    if (validation.fails()) {
      return response.errorInvalid(validation);
    }

    const payload = request.only(['name', 'class', 'description', 'location', 'date']);

    const event = await Event.findOrFail(params.id);
    event.merge(payload);
    await event.save();

    return transform.item(event, EventTransformer);
  }

  async Destroy({ response, params }) {
    const event = await Event.findOrFail(params.id);
    await event.delete();

    return response.noContent();
  }

  async StoreImage({ params, request, response, transform }) {
    const event = await Event.findOrFail(params.id);

    try {
      const image = request.file('image', {
        types: ['image'],
        size: '2mb',
        extnames: ['png', 'jpg', 'jpeg']
      });
      // one event one image
      await event.removeMedias();
      const media = await event.saveMedia(image);
      return transform.item(media, MediaTransformer);
    } catch (error) {
      return response.errorBadRequest(error.message);
    }
  }

  async DestroyImage({ params, response }) {
    const event = await Event.findOrFail(params.id);
    await event.removeMedias();

    return response.noContent();
  }
}

module.exports = EventController;
