'use strict';

const API = require('./lib/api');

const accountClaim = function (params, done) {

  API.post('account-claim', params, done);
};

const accountCreate = function (params, done) {

  API.post('account-create', params, done);
};

const accountEdit = function (params, done) {

  API.post('account-edit', params, done);
};

const accountValid = function (params, done) {

  API.post('account-valid', params, done);
};

const availablePaymentMethods = function (params, done) {

  API.post('available-payment-methods', params, done);
};

const bankaccountEdit = function (params, done) {

  API.post('bankaccount-edit', params, done);
};

const bankaccounts = function (params, done) {

  API.post('bankaccounts', params, done);
};

const disconnectAccount = function (params, done) {

  API.post('disconnect-account', params, done);
};

const getLoginLink = function (params, done) {

  API.post('get-login-link', params, done);
};

const profileCreate = function (params, done) {

  API.post('profile-create', params, done);
};

const profiles = function (params, done) {

  API.post('profiles', params, done);
};

const setFees = function (params, done) {

  API.post('set-fees', params, done);
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
