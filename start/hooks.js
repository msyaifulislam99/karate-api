'use strict';

/* eslint func-names: "off" */

const { hooks } = use('@adonisjs/ignitor');

hooks.after.providersRegistered(() => {});

hooks.after.providersBooted(() => {
  const Request = use('Adonis/Src/Request');
  const Response = use('Adonis/Src/Response');

  Request.macro('getPage', function() {
    const { page, per_page } = this.all();
    return [page || 1, per_page || 20];
  });

  Response.macro('errorInvalid', function(validation, message = 'Unprocessable Entity') {
    const status_code = 422;
    this.status(status_code).json({ message, status_code, errors: validation.messages() });
  });
  Response.macro('errorNotFound', function(message = 'Not Found') {
    const status_code = 404;
    this.status(status_code).json({ message, status_code });
  });
  Response.macro('errorBadRequest', function(message = 'Bad Request') {
    const status_code = 400;
    this.status(status_code).json({ message, status_code });
  });
  Response.macro('errorForbidden', function(message = 'Forbidden') {
    const status_code = 403;
    this.status(status_code).json({ message, status_code });
  });
  Response.macro('errorInternal', function(message = 'Internal Error') {
    const status_code = 500;
    this.status(status_code).json({ message, status_code });
  });
  Response.macro('errorUnauthorized', function(message = 'Unauthorized') {
    const status_code = 401;
    this.status(status_code).json({ message, status_code });
  });
  Response.macro('errorMethodNotAllowed', function(message = 'Method Not Allowed') {
    const status_code = 405;
    this.status(status_code).json({ message, status_code });
  });
});
