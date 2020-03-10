'use strict';

const { validateAll } = use('Validator');
const messages = use('App/Library/Validator/Messages');
const Score = use('App/Models/Score');
const Constants = use('App/Library/Helpers/Constants');

class ScoreController {
  async Store({ transform, request, response, auth, params }) {
    const rules = {
      tech: 'required|number',
      ath: 'required|number'
    };

    const validation = await validateAll(request.all(), rules, messages);
    if (validation.fails()) {
      return response.errorInvalid(validation);
    }

    const judge = await auth.getUser();

    const payload = request.only(['tech', 'ath']);
    const score = await Score.create({
      ...payload,
      judge_id: judge.id,
      stage_id: params.idStage,
      status_ath: Constants.SCORE.STATUS_COUNT,
      status_tech: Constants.SCORE.STATUS_COUNT,
      status: Constants.SCORE.STATUS_ACTIVE
    });

    return transform.item(score, 'ScoreTransformer');
  }
}

module.exports = ScoreController;
