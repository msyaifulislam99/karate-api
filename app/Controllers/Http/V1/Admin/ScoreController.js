'use strict';

const { validateAll } = use('Validator');
const messages = use('App/Library/Validator/Messages');
const Score = use('App/Models/Score');
const Constants = use('App/Library/Helpers/Constants');

class ScoreController {
  async Store({ transform, request, response }) {
    const rules = {
      match_id: 'required|uuid',
      judge_id: 'required|uuid',
      tech: 'required|number',
      ath: 'required|number'
    };

    const validation = await validateAll(request.all(), rules, messages);
    if (validation.fails()) {
      return response.errorInvalid(validation);
    }

    const payload = request.only(['match_id', 'judge_id', 'tech', 'ath']);
    const score = await Score.create({ ...payload, status: Constants.SCORE.STATUS_COUNT });

    return transform.item(score, 'ScoreTransformer');
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
