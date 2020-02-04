'use strict';

const { validateAll } = use('Validator');
const messages = use('App/Library/Validator/Messages');
const Score = use('App/Models/Score');
const ScoreTemporary = use('App/Models/ScoreTemporary');
const Constants = use('App/Library/Helpers/Constants');

class ScoreController {
  async Store({ transform, request, response, auth }) {
    const rules = {
      match_id: 'required|uuid',
      tech: 'required|number',
      ath: 'required|number'
    };

    const validation = await validateAll(request.all(), rules, messages);
    if (validation.fails()) {
      return response.errorInvalid(validation);
    }

    const judge = await auth.getUser();

    const payload = request.only(['match_id', 'tech', 'ath']);
    const score = await Score.create({
      ...payload,
      judge_id: judge.id,
      status_ath: Constants.SCORE.STATUS_COUNT,
      status_tech: Constants.SCORE.STATUS_COUNT
    });

    return transform.item(score, 'ScoreTransformer');
  }

  async StoreTemp({ transform, request, response, auth }) {
    const rules = {
      event_id: 'required|uuid',
      tech: 'required|number',
      ath: 'required|number'
    };

    const validation = await validateAll(request.all(), rules, messages);
    if (validation.fails()) {
      return response.errorInvalid(validation);
    }

    const judge = await auth.getUser();

    const payload = request.only(['event_id', 'tech', 'ath']);
    const score = await ScoreTemporary.create({
      ...payload,
      judge_id: judge.id,
      status_ath: Constants.SCORE.STATUS_COUNT,
      status_tech: Constants.SCORE.STATUS_COUNT,
      status: Constants.SCORE_TEMP.STATUS_DRAFT
    });

    return transform.item(score, 'ScoreTransformer');
  }
}

module.exports = ScoreController;
