'use strict';

module.exports = {
  USER_STATUS_ACTIVE: 'active',
  USER_STATUS_BLOCKED: 'blocked',
  USER_ROLES: ['admin', 'judge', 'participant'],
  AUTH_PROVIDER: ['facebook', 'google'],
  RESTAURANT: {
    STATUS_REVIEWING: 'reviewing',
    STATUS_ACTIVE: 'active',
    STATUS_SUSPENDED: 'suspended'
  },
  MENU: {
    STATUS_AVAILABLE: 'available',
    STATUS_SOLD: 'sold_out'
  },
  ORDER: {
    STATUS_PENDING: 'pending',
    STATUS_PROCESSING: 'processing',
    STATUS_SERVED: 'served',
    STATUS_CANCELLED: 'cancelled',
    STATUS_DECLINED: 'declined'
  },
  SESSION: {
    STATUS_PENDING: 'pending',
    STATUS_PENDING_OPEN: 'pending_open',
    STATUS_PENDING_JOIN: 'pending_join',
    STATUS_ACTIVE: 'active',
    STATUS_PAYMENT: 'payment',
    STATUS_PAYMENT_PENDING: 'payment_pending',
    STATUS_PAYMENT_SUCCESS: 'payment_success',
    STATUS_PAYMENT_FAILURE: 'payment_failure',
    STATUS_CANCELLED: 'cancelled',
    STATUS_DECLINED: 'declined',
    STATUS_CLOSED: 'closed'
  },
  MEMBER: {
    STATUS_PENDING: 'pending',
    STATUS_ACTIVE: 'active',
    STATUS_PAYMENT: 'payment',
    STATUS_PAYMENT_PENDING: 'payment_pending',
    STATUS_PAYMENT_SUCCESS: 'payment_success',
    STATUS_PAYMENT_FAILURE: 'payment_failure',
    STATUS_COMPLETED: 'completed',
    STATUS_LEFT: 'left'
  },
  PAYMENT: {
    TAX_RATE: 10
  }
};
