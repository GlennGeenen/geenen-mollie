'use strict';

const Mollie = require('../index.js');
const Assert = require('assert');
const Crypto = require('crypto');
const Nock = require('nock');

const Lab = require('lab');
const lab = exports.lab = Lab.script();

lab.experiment('Reseller API', () => {

  // Mock Response
  const SuccessResponse = `<?xml version="1.0"?>
    <response version="v1">
      <success>true</success>
      <resultcode>10</resultcode>
      <resultmessage>It works!</resultmessage>
    </response>`;

  lab.before((done) => {

    Mollie.configure({
      partner_id: Crypto.randomBytes(4).toString('hex'),
      profile_key: Crypto.randomBytes(4).toString('hex'),
      app_secret: Crypto.randomBytes(4).toString('hex')
    });
    done();
  });

  lab.test('should succeed to claim account', (done) => {

    Nock('https://mollie.com')
      .post('/api/reseller/v1/account-claim')
      .reply(200, SuccessResponse);

    Mollie.accountClaim({
      username: 'TestUser',
      password: 'TestPassword'
    }, (err, payload) => {

      Assert(err === null);
      Assert(payload.response.version === 'v1');
      Assert(payload.response.success === 'true');
      Assert(payload.response.resultcode === '10');
      Assert(payload.response.resultmessage === 'It works!');
      done();
    });
  });

  lab.test('should succeed to create account', (done) => {

    Nock('https://mollie.com')
      .post('/api/reseller/v1/account-create')
      .reply(200, SuccessResponse);

    Mollie.accountCreate({
      testmode: 1,
      username: 'TestUser',
      name: 'Glenn Geenen',
      company_name: 'GeenenTijd',
      email: 'glenn@geenentijd.be',
      address: 'My Address 1',
      zipcode: '1000',
      city: 'Brussels',
      country: 'BE'
    }, (err, payload) => {

      Assert(err === null);
      Assert(payload.response.version === 'v1');
      Assert(payload.response.success === 'true');
      Assert(payload.response.resultcode === '10');
      Assert(payload.response.resultmessage === 'It works!');
      done();
    });
  });

  lab.test('should succeed to edit account', (done) => {

    Nock('https://mollie.com')
      .post('/api/reseller/v1/account-edit')
      .reply(200, SuccessResponse);

    Mollie.accountEdit({
      username: 'TestUser',
      name: 'Glenn Geenen',
      company_name: 'GeenenTijd',
      email: 'glenn@geenentijd.be',
      address: 'My Address 1',
      zipcode: '1000',
      city: 'Brussels',
      country: 'BE'
    }, (err, payload) => {

      Assert(err === null);
      Assert(payload.response.version === 'v1');
      Assert(payload.response.success === 'true');
      Assert(payload.response.resultcode === '10');
      Assert(payload.response.resultmessage === 'It works!');
      done();
    });
  });

  lab.test('should succeed to validate account', (done) => {

    Nock('https://mollie.com')
      .post('/api/reseller/v1/account-valid')
      .reply(200, SuccessResponse);

    Mollie.accountValid({
      username: 'TestUser',
      password: 'TestPassword'
    }, (err, payload) => {

      Assert(err === null);
      Assert(payload.response.version === 'v1');
      Assert(payload.response.success === 'true');
      Assert(payload.response.resultcode === '10');
      Assert(payload.response.resultmessage === 'It works!');
      done();
    });
  });

  lab.test('should succeed to check available payment methods', (done) => {

    Nock('https://mollie.com')
      .post('/api/reseller/v1/available-payment-methods')
      .reply(200, SuccessResponse);

    Mollie.availablePaymentMethods({
      username: 'TestUser',
      password: 'TestPassword',
      partner_id_customer: Crypto.randomBytes(4).toString('hex')
    }, (err, payload) => {

      Assert(err === null);
      Assert(payload.response.version === 'v1');
      Assert(payload.response.success === 'true');
      Assert(payload.response.resultcode === '10');
      Assert(payload.response.resultmessage === 'It works!');
      done();
    });
  });

  lab.test('should succeed to edit bankaccount', (done) => {

    Nock('https://mollie.com')
      .post('/api/reseller/v1/bankaccount-edit')
      .reply(200, SuccessResponse);

    Mollie.bankaccountEdit({
      username: 'TestUser',
      password: 'TestPassword',
      partner_id_customer: Crypto.randomBytes(4).toString('hex'),
      id: Crypto.randomBytes(4).toString('hex')
    }, (err, payload) => {

      Assert(err === null);
      Assert(payload.response.version === 'v1');
      Assert(payload.response.success === 'true');
      Assert(payload.response.resultcode === '10');
      Assert(payload.response.resultmessage === 'It works!');
      done();
    });
  });

  lab.test('should succeed to get bankaccounts', (done) => {

    Nock('https://mollie.com')
      .post('/api/reseller/v1/bankaccounts')
      .reply(200, SuccessResponse);

    Mollie.bankaccounts({
      username: 'TestUser',
      password: 'TestPassword',
      partner_id_customer: Crypto.randomBytes(4).toString('hex')
    }, (err, payload) => {

      Assert(err === null);
      Assert(payload.response.version === 'v1');
      Assert(payload.response.success === 'true');
      Assert(payload.response.resultcode === '10');
      Assert(payload.response.resultmessage === 'It works!');
      done();
    });
  });

  lab.test('should succeed to disconnect account', (done) => {

    Nock('https://mollie.com')
      .post('/api/reseller/v1/disconnect-account')
      .reply(200, SuccessResponse);

    Mollie.disconnectAccount({
      username: 'TestUser',
      password: 'TestPassword',
      partner_id_customer: Crypto.randomBytes(4).toString('hex')
    }, (err, payload) => {

      Assert(err === null);
      Assert(payload.response.version === 'v1');
      Assert(payload.response.success === 'true');
      Assert(payload.response.resultcode === '10');
      Assert(payload.response.resultmessage === 'It works!');
      done();
    });
  });

  lab.test('should succeed to get login link', (done) => {

    Nock('https://mollie.com')
      .post('/api/reseller/v1/get-login-link')
      .reply(200, SuccessResponse);

    Mollie.getLoginLink({
      username: 'TestUser',
      password: 'TestPassword',
      partner_id_customer: Crypto.randomBytes(4).toString('hex')
    }, (err, payload) => {

      Assert(err === null);
      Assert(payload.response.version === 'v1');
      Assert(payload.response.success === 'true');
      Assert(payload.response.resultcode === '10');
      Assert(payload.response.resultmessage === 'It works!');
      done();
    });
  });

  lab.test('should succeed to create profile', (done) => {

    Nock('https://mollie.com')
      .post('/api/reseller/v1/profile-create')
      .reply(200, SuccessResponse);

    Mollie.profileCreate({
      username: 'TestUser',
      password: 'TestPassword',
      partner_id_customer: Crypto.randomBytes(4).toString('hex'),
      name: 'TestName',
      website: 'https://geenentijd.be',
      email: 'glenn@geenentijd.be',
      phone: '0123456789',
      category: 4121
    }, (err, payload) => {

      Assert(err === null);
      Assert(payload.response.version === 'v1');
      Assert(payload.response.success === 'true');
      Assert(payload.response.resultcode === '10');
      Assert(payload.response.resultmessage === 'It works!');
      done();
    });
  });

  lab.test('should succeed to get profile', (done) => {

    Nock('https://mollie.com')
      .post('/api/reseller/v1/profiles')
      .reply(200, SuccessResponse);

    Mollie.profiles({
      username: 'TestUser',
      password: 'TestPassword',
      partner_id_customer: Crypto.randomBytes(4).toString('hex')
    }, (err, payload) => {

      Assert(err === null);
      Assert(payload.response.version === 'v1');
      Assert(payload.response.success === 'true');
      Assert(payload.response.resultcode === '10');
      Assert(payload.response.resultmessage === 'It works!');
      done();
    });
  });

  lab.test('should succeed to set fees', (done) => {

    Nock('https://mollie.com')
      .post('/api/reseller/v1/set-fees')
      .reply(200, SuccessResponse);

    Mollie.setFees({
      username: 'TestUser',
      password: 'TestPassword',
      partner_id_customer: Crypto.randomBytes(4).toString('hex'),
      payment_method: 'ideal',
      payment_subtype: 'ideal',
      fee_type: 'fixed',
      fee: 0.5
    }, (err, payload) => {

      Assert(err === null);
      Assert(payload.response.version === 'v1');
      Assert(payload.response.success === 'true');
      Assert(payload.response.resultcode === '10');
      Assert(payload.response.resultmessage === 'It works!');
      done();
    });
  });

  lab.test('should handle request error', (done) => {

    Nock('https://mollie.com')
      .post('/api/reseller/v1/set-fees')
      .replyWithError('something awful happened');

    Mollie.setFees({
      username: 'TestUser',
      password: 'TestPassword',
      partner_id_customer: Crypto.randomBytes(4).toString('hex'),
      payment_method: 'ideal',
      payment_subtype: 'ideal',
      fee_type: 'fixed',
      fee: 0.5
    }, (err, payload) => {

      Assert(err !== null);
      Assert(payload === undefined);
      done();
    });
  });

  lab.test('should get error on invalid xml', (done) => {

    Nock('https://mollie.com')
      .post('/api/reseller/v1/set-fees')
      .reply(200, `<?xml version="1.0"?>
        <response version="v1">
          <success>true
          <resultcode>10</resultcode>
          <resultmessage>It works!</resultmessage>
        </response>`);

    Mollie.setFees({
      username: 'TestUser',
      password: 'TestPassword',
      partner_id_customer: Crypto.randomBytes(4).toString('hex'),
      payment_method: 'ideal',
      payment_subtype: 'ideal',
      fee_type: 'fixed',
      fee: 0.5
    }, (err, payload) => {

      Assert(err !== null);
      Assert(payload === undefined);
      done();
    });
  });

});
