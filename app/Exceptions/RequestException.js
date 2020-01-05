'use strict';

const { HttpException } = use('@adonisjs/generic-exceptions');

class RequestException extends HttpException {
  /**
   * Handle this exception by itself
   */
  // handle () {}
}

module.exports = RequestException;
