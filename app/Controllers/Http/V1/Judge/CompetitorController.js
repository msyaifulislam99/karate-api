'use strict';

const Query = use('Query');
// const Competitor = use('App/Models/Competitor');
const Event = use('App/Models/Event');
const CompetitorTransformer = use('App/Transformers/CompetitorTransformer');
const RequestException = use('App/Exceptions/RequestException');
// const Constants = use('App/Library/Helpers/Constants');

class CompetitorController {
  async Index({ transform, request, params }) {
    const query_search = new Query(request, { order: 'name' });
    const order = query_search.order();
    const event = await this.getEvent(params.idEvent);
    const competitors = await event
      .competitors()
      .where(query_search.search(['status']))
      .orderBy(order.column, order.direction)
      .paginate(...request.getPage());

    return transform.paginate(competitors, CompetitorTransformer);
  }

  async Show({ params, transform }) {
    const competitor = await this.getCompetitor(params);
    return transform.item(competitor, CompetitorTransformer);
  }

  async getEvent(id) {
    const event = await Event.findOrFail(id);

    if (!event) {
      throw new RequestException('Event not found', 404);
    }

    return event;
  }
}

module.exports = CompetitorController;
