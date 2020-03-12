'use strict';

const { validateAll } = use('Validator');
const messages = use('App/Library/Validator/Messages');
const Score = use('App/Models/Score');
const Stage = use('App/Models/Stage');
const Constants = use('App/Library/Helpers/Constants');
const RequestException = use('App/Exceptions/RequestException');

class ScoreController {
  async IndexReset({ transform, params }) {
    const stage = await Stage.findOrFail(params.idStage);

    await Score.query()
      .where('stage_id', '=', params.idStage)
      .update({ status: Constants.SCORE.STATUS_INACTIVE });

    const payload = {
      score: 0,
      athlete: '',
      contingen: ''
    };
    stage.merge(payload);
    await stage.save();

    return transform.item(stage, 'StageTransformer');
  }

  async Index({ params, transform }) {
    const stage = await Stage.findOrFail(params.idStage);
    const scores = await stage
      .scores()
      .where('status', '=', Constants.SCORE.STATUS_ACTIVE)
      .fetch();

    return transform.collection(scores, 'ScoreTransformer');
  }

  async IndexCalculate({ params, transform, response, request }) {
    const rules = {
      judge_count: 'required|number|in:5,7'
    };

    const validation = await validateAll(request.all(), rules, messages);
    if (validation.fails()) {
      return response.errorInvalid(validation);
    }

    const stage = await Stage.findOrFail(params.idStage);
    const scores = await stage
      .scores()
      .where('status', '=', Constants.SCORE.STATUS_ACTIVE)
      .fetch();

    const json = scores.toJSON();
    const judge_count = parseInt(request.input('judge_count'), 10);

    if (judge_count !== json.length) {
      throw new RequestException('Judge Count not Match', 400);
    }

    const sum_tech = Score.calculate(json, 'tech', request.input('judge_count'));
    const sum_ath = Score.calculate(json, 'ath', request.input('judge_count'));
    const sum = sum_tech + sum_ath;

    const data = { score: sum.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 6 }) };
    stage.merge(data);
    await stage.save();

    return transform.item(stage, 'StageTransformer');
  }

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

  async Destroy({ response, params }) {
    const score = await Score.findOrFail(params.id);
    await score.delete();

    return response.noContent();
  }
}

module.exports = ScoreController;
