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
}

module.exports = ScoreController;
