'use strict';

const Mollie = require('../index.js');
const Assert = require('assert');
const Crypto = require('crypto');
const Nock = require('nock');

const Lab = require('lab');
const lab = exports.lab = Lab.script();

lab.experiment('Reseller API errors', () => {

  lab.before((done) => {

    Mollie.configure({
      partner_id: Crypto.randomBytes(4).toString('hex'),
      profile_key: Crypto.randomBytes(4).toString('hex'),
      app_secret: Crypto.randomBytes(4).toString('hex')
    });
    done();
  });

  lab.test('should get bad request to claim account', (done) => {

    Nock('https://mollie.com')
      .post('/api/reseller/v1/account-claim')
      .reply(200, `<?xml version="1.0"?>
        <response>
          <success>true</success>
          <resultcode>30</resultcode>
          <resultmessage>Something went wrong.</resultmessage>
        </response>
      `);

    Mollie.accountClaim({
      username: 'TestUser',
      password: 'TestPassword'
    }, (err, payload) => {

      Assert(err);
      done();
    });
  });

  lab.test('should get bad request to create account', (done) => {

    Nock('https://mollie.com')
      .post('/api/reseller/v1/account-create')
      .reply(200, `<?xml version="1.0" encoding="UTF-8"?>
        <response version="v1">
          <success>true</success>
          <resultcode>30</resultcode>
          <resultmessage>Something went wrong.</resultmessage>
        </response>
      `);

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

      Assert(err);
      done();
    });
  });

  lab.test('should get bad request to edit account', (done) => {

    Nock('https://mollie.com')
      .post('/api/reseller/v1/account-edit')
      .reply(200, `<?xml version="1.0" encoding="UTF-8"?>
        <response>
          <success>true</success>
          <resultcode>30</resultcode>
          <resultmessage>Something went wrong.</resultmessage>
        </response>
      `);

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

      Assert(err);
      done();
    });
  });

  lab.test('should get bad request validate account', (done) => {

    Nock('https://mollie.com')
      .post('/api/reseller/v1/account-valid')
      .reply(200, `<?xml version="1.0"?>
        <response>
          <success>true</success>
          <resultcode>30</resultcode>
          <resultmessage>Something went wrong.</resultmessage>
          <exists>true</exists>
          <partner_id>1337</partner_id>
        </response>
      `);

    Mollie.accountValid({
      username: 'TestUser',
      password: 'TestPassword'
    }, (err, payload) => {

      Assert(err);
      done();
    });
  });

  lab.test('should get bad request to check available payment methods', (done) => {

    Nock('https://mollie.com')
      .post('/api/reseller/v1/available-payment-methods')
      .reply(200, `<?xml version="1.0"?>
        <response>
          <success>true</success>
          <resultcode>30</resultcode>
          <resultmessage>Something went wrong.</resultmessage>
        </response>
      `);

    Mollie.availablePaymentMethods({
      username: 'TestUser',
      password: 'TestPassword',
      partner_id_customer: Crypto.randomBytes(4).toString('hex')
    }, (err, payload) => {

      Assert(err);
      done();
    });
  });

  lab.test('should get bad request to edit bankaccount', (done) => {

    Nock('https://mollie.com')
      .post('/api/reseller/v1/bankaccount-edit')
      .reply(200, `<?xml version="1.0" encoding="UTF-8"?>
        <response>
          <success>false</success>
          <resultcode>30</resultcode>
          <resultmessage>Something went wrong.</resultmessage>
        </response>
      `);

    Mollie.bankaccountEdit({
      username: 'TestUser',
      password: 'TestPassword',
      partner_id_customer: Crypto.randomBytes(4).toString('hex'),
      id: Crypto.randomBytes(4).toString('hex')
    }, (err, payload) => {

      Assert(err);
      done();
    });
  });

  lab.test('should succeed to get single bankaccount', (done) => {

    Nock('https://mollie.com')
      .post('/api/reseller/v1/bankaccounts')
      .reply(200, 'no xml');

    Mollie.bankaccounts({
      username: 'TestUser',
      password: 'TestPassword',
      partner_id_customer: Crypto.randomBytes(4).toString('hex')
    }, (err, payload) => {

      Assert(err);
      done();
    });
  });

  lab.test('should get bad request to disconnect account', (done) => {

    Nock('https://mollie.com')
      .post('/api/reseller/v1/disconnect-account')
      .reply(200, `<?xml version="1.0" encoding="UTF-8"?>
        <response>
          <success>true</success>
          <resultcode>30</resultcode>
          <resultmessage>Something went wrong.</resultmessage>
        </response>
      `);

    Mollie.disconnectAccount({
      username: 'TestUser',
      password: 'TestPassword',
      partner_id_customer: Crypto.randomBytes(4).toString('hex')
    }, (err, payload) => {

      Assert(err);
      done();
    });
  });

  lab.test('should get bad request to get login link', (done) => {

    Nock('https://mollie.com')
      .post('/api/reseller/v1/get-login-link')
      .reply(200, `<?xml version="1.0" encoding="UTF-8"?>
        <response version="v1">
          <success>false</success>
          <resultcode>30</resultcode>
          <resultmessage>Something went wrong.</resultmessage>
        </response>
      `);

    Mollie.getLoginLink({
      username: 'TestUser',
      password: 'TestPassword',
      partner_id_customer: Crypto.randomBytes(4).toString('hex')
    }, (err, payload) => {

      Assert(err);
      done();
    });
  });

  lab.test('should get bad request to create profile', (done) => {

    Nock('https://mollie.com')
      .post('/api/reseller/v1/profile-create')
      .reply(200, `<?xml version="1.0" encoding="UTF-8"?>
        <response version="v1">
          <success>true</success>
          <resultcode>30</resultcode>
          <resultmessage>Something went wrong.</resultmessage>
        </response>
      `);

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

      Assert(err);
      done();
    });
  });

  lab.test('should handle profiles error', (done) => {

    Nock('https://mollie.com')
      .post('/api/reseller/v1/profiles')
      .reply(200, 'no xml'
      );

    Mollie.profiles({
      username: 'TestUser',
      password: 'TestPassword',
      partner_id_customer: Crypto.randomBytes(4).toString('hex')
    }, (err, payload) => {

      Assert(err);
      done();
    });
  });

  lab.test('should get bad request to set fees', (done) => {

    Nock('https://mollie.com')
      .post('/api/reseller/v1/set-fees')
      .reply(200, `<?xml version="1.0"?>
        <response>
          <success>true</success>
          <resultcode>30</resultcode>
          <resultmessage>Something went wrong.</resultmessage>
        </response>
      `);

    Mollie.setFees({
      username: 'TestUser',
      password: 'TestPassword',
      partner_id_customer: Crypto.randomBytes(4).toString('hex'),
      payment_method: 'ideal',
      payment_subtype: 'ideal',
      fee_type: 'fixed',
      fee: 0.5
    }, (err, payload) => {

      Assert(err);
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
