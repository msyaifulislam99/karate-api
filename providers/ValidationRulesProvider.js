'use strict';

const { ServiceProvider } = require('@adonisjs/fold');

class ValidationRulesProvider extends ServiceProvider {
  register() {}

  boot() {
    const Validator = this.app.use('Adonis/Addons/Validator');

    // ===================== Phone Rule =====================
    Validator.extend('phone', (data, field, message, args, get) => {
      return new Promise((resolve, reject) => {
        const value = get(data, field);
        if (!value) {
          /**
           * skip validation if value is not defined. `required` rule
           * should take care of it.
           */
          return resolve('validation skipped');
        }

        const valid = /^(^\+62\s?|^0)(\d{3,4}-?){2}\d{3,4}$/g.test(value.replace(/[^0-9+]/g, ''));
        if (!valid) {
          return reject(message);
        }

        return resolve('Allowed');
      });
    });

    // ===================== UUID Rule =====================
    Validator.extend('uuid', (data, field, message, args, get) => {
      return new Promise((resolve, reject) => {
        const value = get(data, field);
        if (!value) {
          /**
           * skip validation if value is not defined. `required` rule
           * should take care of it.
           */
          return resolve('validation skipped');
        }

        const valid = /^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i.test(value);
        if (!valid) {
          return reject(message);
        }

        return resolve('Allowed');
      });
    });

    // ===================== Time Rule =====================
    Validator.extend('time', (data, field, message, args, get) => {
      return new Promise((resolve, reject) => {
        const value = get(data, field);
        if (!value) {
          /**
           * skip validation if value is not defined. `required` rule
           * should take care of it.
           */
          return resolve('validation skipped');
        }

        const valid = /^([0-1]?[0-9]|2[0-4]):([0-5][0-9])(:[0-5][0-9])?$/.test(value);
        if (!valid) {
          return reject(message);
        }

        return resolve('Allowed');
      });
    });
  }
}

module.exports = ValidationRulesProvider;
