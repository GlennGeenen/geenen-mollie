'use strict';

const Crypto = require('crypto');
const Query = require('querystring');

const stringifyQuery = function (query) {

  const keys = Object.keys(query).sort();
  const queryArray = keys.map((key) => {

    return Query.escape(key) + '=' + Query.escape(query[key]);
  });

  return queryArray.join('&');
};

const signature = function (path, query, secret) {

  const result = '/' + path + '?' + stringifyQuery(query);
  return Crypto.createHmac('sha1', secret).update(result).digest('hex');
};

module.exports = {
  stringifyQuery,
  signature
};
