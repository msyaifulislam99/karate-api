const shortid = use('shortid-36');
const orderid = use('order-id')('AC5dad3d1b737db313681bb8');

module.exports = {
  isValidJSON(text) {
    if (
      /^[\],:{}\s]*$/.test(
        text
          // eslint-disable-next-line no-useless-escape
          .replace(/\\["\\\/bfnrtu]/g, '@')
          // eslint-disable-next-line no-useless-escape
          .replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']')
          .replace(/(?:^|:|,)(?:\s*\[)+/g, '')
      )
    ) {
      // the json is ok
      return true;
    }
    // the json is not ok
    return false;
  },

  padZero(num, size) {
    let s = `${num}`;
    while (s.length < size) s = `0${s}`;
    return s;
  },

  generateShortCode(suffix = '') {
    let id = shortid.generate();
    id = id.slice(0, -2);
    return id + suffix;
  },

  generateOrderNumber() {
    return orderid.generate();
  }
};
