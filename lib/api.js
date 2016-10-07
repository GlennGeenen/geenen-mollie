'use strict';

const Https = require('https');
const Helper = require('./signature');
const Parser = require('xml2json');

let partner_id;
let profile_key;
let app_secret;

const configure = function (config) {

  partner_id = config.partner_id;
  profile_key = config.profile_key;
  app_secret = config.app_secret;
};

const getParams = function () {

  return {
    partner_id,
    profile_key,
    timestamp: Math.round(Date.now() / 1000)
  };
};

const post = function (action, data, callback) {

  const url = `https://mollie.com/api/reseller/v1/${action}`;

  // We add the required mollie parameters
  const payload = Object.assign(data, getParams());

  // We add the mollie signature
  payload.signature = Helper.signature(url, payload, app_secret);

  const options = {
    hostname: 'mollie.com',
    port: 443,
    path: `/api/reseller/v1/${action}`,
    method: 'POST',
    headers: {
      Accept: 'application/xml',
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    rejectUnauthorized: true
  };

  const request = Https.request(options);

  request.on('error', (e) => {

    return callback(e);
  });

  request.on('response', (response) => {

    let body = '';
    response.on('data', (chunk) => {

      body += chunk.toString('utf-8');
    });

    response.on('end', () => {

      let json;
      try {
        json = Parser.toJson(body, { object: true });
      }
      catch (ex) {
        return callback(ex);
      }

      return callback(null, json.response);
    });
  });

  // Add payload
  request.write(Helper.stringifyQuery(payload));
  return request.end();
};

module.exports = {
  configure,
  post
};
