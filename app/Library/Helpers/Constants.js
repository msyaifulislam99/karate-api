'use strict';

module.exports = {
  USER_STATUS_ACTIVE: 'active',
  USER_ROLES: ['admin', 'judge'],
  GROUP: {
    STATUS_READY: 'ready',
    STATUS_ACTIVE: 'active',
    STATUS_DONE: 'done',
    STATUS_REMATCH: 'rematch'
  },
  SCORE: {
    STATUS_COUNT: 'counted',
    STATUS_UNCOUNT: 'uncounted'
  },
  SCORE_TEMP: {
    STATUS_DRAFT: 'draft',
    STATUS_DELETE: 'deleted',
    STATUS_MOVE: 'moved'
  },
  MATCH: {
    STATUS_ACTIVE: 'ready',
    STATUS_DONE: 'done'
  },
  COMPETITOR: {
    STATUS_ACTIVE: 'active',
    STATUS_DONE: 'eliminated'
  }
};
