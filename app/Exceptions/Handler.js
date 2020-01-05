'use strict';

const BaseExceptionHandler = use('BaseExceptionHandler');

/**
 * This class handles all exceptions thrown during
 * the HTTP request lifecycle.
 *
 * @class ExceptionHandler
 */
class ExceptionHandler extends BaseExceptionHandler {
  /**
   * Handle exception thrown during the HTTP lifecycle
   *
   * @method handle
   *
   * @param  {Object} error
   * @param  {Object} options.request
   * @param  {Object} options.response
   *
   * @return {void}
   */
  // eslint-disable-next-line no-unused-vars
  async handle(error, { request, response }) {
    response.status(error.status).send({
      message: (error.message || '').split('\n')[0],
      status_code: error.status || error.code
    });
  }

  /**
   * Report exception for logging or debugging.
   *
   * @method report
   *
   * @param  {Object} error
   * @param  {Object} options.request
   *
   * @return {void}
   */
  // eslint-disable-next-line no-unused-vars,no-empty-function
  async report(error, { request }) {}
}

module.exports = ExceptionHandler;
