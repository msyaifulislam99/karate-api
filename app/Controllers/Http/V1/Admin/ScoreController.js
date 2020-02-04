'use strict';

const { validateAll } = use('Validator');
const messages = use('App/Library/Validator/Messages');
const Score = use('App/Models/Score');
const Event = use('App/Models/Event');
const Match = use('App/Models/Match');
const Constants = use('App/Library/Helpers/Constants');
const ScoreTemporary = use('App/Models/ScoreTemporary');

class ScoreController {
  async Index({ transform, request, response, params }) {
    const rules = {
      status: 'required|in:all,draft,deleted,moved'
    };

    const validation = await validateAll(request.all(), rules, messages);
    if (validation.fails()) {
      return response.errorInvalid(validation);
    }

    const event = await Event.findOrFail(params.id);

    const query = event.scores();

    if (request.input('status') !== 'all') {
      query.where('status', '=', request.input('status'));
    }

    const scores = await query.fetch();

    return transform.collection(scores, 'ScoreTransformer');
  }

  async StoreTemp({ transform, request, response, params }) {
    const rules = {
      competitor_id: 'required|uuid',
      information: 'required'
    };

    const validation = await validateAll(request.all(), rules, messages);
    if (validation.fails()) {
      return response.errorInvalid(validation);
    }

    const payload = request.only(['competitor_id', 'information', 'score']);

    const match = await Match.create({
      ...payload,
      status: Constants.MATCH.STATUS_ACTIVE,
      event_id: params.idEvent
    });

    const data = [];
    // insert many
    for (const score of request.input('scores') || []) {
      data.push({
        match_id: match.id,
        judge_id: score.judge_id,
        tech: score.tech,
        ath: score.ath,
        status_tech: score.status_tech,
        status_ath: score.status_ath
      });
    }
    await match.scores().createMany(data);

    await ScoreTemporary.query()
      .where('status', '=', 'draft')
      .update({ status: 'moved' });

    return transform.item(match, 'MatchTransformer');
  }

  async Update({ transform, request, response, params }) {
    const rules = {
      status_ath: 'required|in:counted,uncounted',
      status_tech: 'required|in:counted,uncounted',
      tech: 'required|number',
      ath: 'required|number'
    };

    const validation = await validateAll(request.all(), rules, messages);
    if (validation.fails()) {
      return response.errorInvalid(validation);
    }

    const score = await Score.findOrFail(params.id);

    const payload = request.only(['status_ath', 'status_tech', 'tech', 'ath']);
    score.merge(payload);
    await score.save();

    return transform.item(score, 'ScoreTransformer');
  }
}

module.exports = ScoreController;
