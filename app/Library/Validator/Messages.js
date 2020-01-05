/* eslint no-unused-vars: "off" */
const { lowerCase } = use('lodash');

const messages = {
  phone: (field, validation, args) => {
    return `The ${lowerCase(field)} must be valid phone number format.`;
  },
  uuid: (field, validation, args) => {
    return `The ${lowerCase(field)} must be a valid UUID.`;
  },
  time: (field, validation, args) => {
    return `The ${lowerCase(field)} must be a valid time format.`;
  },
  file: (field, validation, args) => {
    return `The ${lowerCase(field)} must be a valid image format.`;
  },
  above: (field, validation, args) => {
    return `The ${lowerCase(field)} failed on validation.`;
  },
  accepted: (field, validation, args) => {
    return `The ${lowerCase(field)} must be accepted.`;
  },
  alpha: (field, validation, args) => {
    return `The ${lowerCase(field)} may only contain letters.`;
  },
  alphaNumeric: (field, validation, args) => {
    return `The ${lowerCase(field)} may only contain letters and numbers.`;
  },
  array: (field, validation, args) => {
    return `The ${lowerCase(field)} must be an array.`;
  },
  boolean: (field, validation, args) => {
    return `The ${lowerCase(field)} field must be true or false.`;
  },
  confirmed: (field, validation, args) => {
    return `The ${lowerCase(field)} confirmation does not match.`;
  },
  different: (field, validation, args) => {
    return `The ${lowerCase(field)} and ${args} must be different.`;
  },
  email: (field, validation, args) => {
    return `The ${lowerCase(field)} must be a valid email address.`;
  },
  endsWith: (field, validation, args) => {
    return `The ${lowerCase(field)} must end with one of the following: ${args}.`;
  },
  equals: (field, validation, args) => {
    return `The ${lowerCase(field)} must equal with the following: ${args}.`;
  },
  in: (field, validation, args) => {
    return `The selected ${lowerCase(field)} is invalid.`;
  },
  includes: (field, validation, args) => {
    return `The ${lowerCase(field)} failed on validation.`;
  },
  integer: (field, validation, args) => {
    return `The ${lowerCase(field)} must be an integer.`;
  },
  float: (field, validation, args) => {
    return `The ${lowerCase(field)} must be an float.`;
  },
  ip: (field, validation, args) => {
    return `The ${lowerCase(field)} failed on validation.`;
  },
  ipv4: (field, validation, args) => {
    return `The ${lowerCase(field)} must be a valid IPv4 address`;
  },
  ipv6: (field, validation, args) => {
    return `The ${lowerCase(field)} must be a valid IPv6 address`;
  },
  json: (field, validation, args) => {
    return `The ${lowerCase(field)} must be a valid JSON string.`;
  },
  max: (field, validation, args) => {
    return `The ${lowerCase(field)} may not be greater than ${args}.`;
  },
  min: (field, validation, args) => {
    return `The ${lowerCase(field)} must be at least ${args}.`;
  },
  notEquals: (field, validation, args) => {
    return `The ${lowerCase(field)} failed on validation.`;
  },
  notIn: (field, validation, args) => {
    return `The selected ${lowerCase(field)} is invalid.`;
  },
  number: (field, validation, args) => {
    return `The ${lowerCase(field)} must be a number.`;
  },
  object: (field, validation, args) => {
    return `The ${lowerCase(field)} must be a valid object.`;
  },
  range: (field, validation, args) => {
    return `The ${lowerCase(field)} must be between ${args[0]} and ${args[1]}.`;
  },
  regex: (field, validation, args) => {
    return `The ${lowerCase(field)} format is invalid.`;
  },
  required: (field, validation, args) => {
    return `The ${lowerCase(field)} field is required.`;
  },
  requiredIf: (field, validation, args) => {
    return `The ${lowerCase(field)} field is required when ${args[0]} is ${args[1]}.`;
  },
  requiredWhen: (field, validation, args) => {
    return `The ${lowerCase(field)} failed on validation.`;
  },
  requiredWithAll: (field, validation, args) => {
    return `The ${lowerCase(field)} failed on validation.`;
  },
  requiredWithAny: (field, validation, args) => {
    return `The ${lowerCase(field)} failed on validation.`;
  },
  requiredWithoutAll: (field, validation, args) => {
    return `The ${lowerCase(field)} failed on validation.`;
  },
  requiredWithoutAny: (field, validation, args) => {
    return `The ${lowerCase(field)} failed on validation.`;
  },
  same: (field, validation, args) => {
    return `The ${lowerCase(field)} and ${args} must match.`;
  },
  startsWith: (field, validation, args) => {
    return `The ${lowerCase(field)} must start with one of the following: ${args}.`;
  },
  string: (field, validation, args) => {
    return `The ${lowerCase(field)} must be a string.`;
  },
  subset: (field, validation, args) => {
    return `The ${lowerCase(field)} failed on validation.`;
  },
  under: (field, validation, args) => {
    return `The ${lowerCase(field)} failed on validation.`;
  },
  url: (field, validation, args) => {
    return `The ${lowerCase(field)} format is invalid.`;
  },
  after: (field, validation, args) => {
    return `The ${lowerCase(field)} must be a date after ${args}.`;
  },
  before: (field, validation, args) => {
    return `The ${lowerCase(field)} must be a date before ${args}.`;
  },
  date: (field, validation, args) => {
    return `The ${lowerCase(field)} is not a valid date.`;
  },
  dateFormat: (field, validation, args) => {
    return `The ${lowerCase(field)} does not match the format ${args}.`;
  },
  beforeOffsetOf: (field, validation, args) => {
    return `The ${lowerCase(field)} failed on validation.`;
  },
  afterOffsetOf: (field, validation, args) => {
    return `The ${lowerCase(field)} failed on validation.`;
  }
};

module.exports = messages;
