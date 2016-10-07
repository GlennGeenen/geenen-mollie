'use strict';

const Boom = require('boom');
const API = require('./lib/api');

const errorHandler = function (callback) {

  return function (err, response) {

    if (err) {
      return callback(err);
    }

    if (response.resultcode !== '10') {
      return callback(Boom.badRequest(response.resultmessage));
    }

    callback(null, response);
  };
};

const accountClaim = function (params, done) {

  API.post('account-claim', params, errorHandler(done));
};

const accountCreate = function (params, done) {

  API.post('account-create', params, errorHandler(done));
};

const accountEdit = function (params, done) {

  API.post('account-edit', params, errorHandler(done));
};

const accountValid = function (params, done) {

  API.post('account-valid', params, errorHandler(done));
};

const availablePaymentMethods = function (params, done) {

  API.post('available-payment-methods', params, errorHandler(done));
};

const bankaccountEdit = function (params, done) {

  API.post('bankaccount-edit', params, errorHandler(done));
};

const bankaccounts = function (params, done) {

  API.post('bankaccounts', params, (err, response) => {

    if (err) {
      return done(err);
    }

    if (Array.isArray(response.items.bankaccount)) {
      return done(null, response.items.bankaccount);
    }

    return done(null, [response.items.bankaccount]);
  });
};

const disconnectAccount = function (params, done) {

  API.post('disconnect-account', params, errorHandler(done));
};

const getLoginLink = function (params, done) {

  API.post('get-login-link', params, errorHandler(done));
};

const profileCreate = function (params, done) {

  API.post('profile-create', params, errorHandler(done));
};

const profiles = function (params, done) {

  API.post('profiles', params, (err, response) => {

    if (err) {
      return done(err);
    }

    if (Array.isArray(response.items.profile)) {
      return done(null, response.items.profile);
    }

    return done(null, [response.items.profile]);
  });
};

const setFees = function (params, done) {

  API.post('set-fees', params, errorHandler(done));
};

module.exports = {
  configure: API.configure,
  accountClaim,
  accountCreate,
  accountEdit,
  accountValid,
  availablePaymentMethods,
  bankaccountEdit,
  bankaccounts,
  disconnectAccount,
  getLoginLink,
  profileCreate,
  profiles,
  setFees
};
