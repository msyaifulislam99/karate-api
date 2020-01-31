'use strict';

const Match = use('App/Models/Match');
const Constants = use('App/Library/Helpers/Constants');

class MatchController {
  async Index({ transform, params }) {
    const matches = Match.query()
      .where('matches.status', '=', Constants.MATCH.STATUS_ACTIVE)
      .whereHas('group.round.event', builder => {
        builder.where('id', '=', params.idEvent);
      })
      .fetch();

    return transform.collection(matches, 'MatchTransformer');
  }
}

module.exports = MatchController;
