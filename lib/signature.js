'use strict';

const Crypto = require('crypto');

const urlencode = function (str) {

  return encodeURIComponent(str)
    .replace(/!/g, '%21')
    .replace(/'/g, '%27')
    .replace(/~/g, '%7E')
    .replace(/\(/g, '%28')
    .replace(/\)/g, '%29')
    .replace(/\*/g, '%2A')
    .replace(/%20/g, '+');
};

const stringifyQuery = function (query) {

  const keys = Object.keys(query).sort();
  const queryArray = keys.map((key) => {

    return urlencode(key) + '=' + urlencode(query[key]);
  });

  return queryArray.join('&');
};

const signature = function (path, query, secret) {

  const result = path + '?' + stringifyQuery(query);

  return Crypto.createHmac('sha1', secret).update(result).digest('hex');
};

module.exports = {
  stringifyQuery,
  signature
};
