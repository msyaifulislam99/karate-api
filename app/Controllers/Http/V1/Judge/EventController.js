'use strict';

const Query = use('Query');
const Event = use('App/Models/Event');
const EventTransformer = use('App/Transformers/EventTransformer');

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
}

module.exports = EventController;
