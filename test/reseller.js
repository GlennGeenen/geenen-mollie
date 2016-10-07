'use strict';

const Mollie = require('../index.js');
const Assert = require('assert');
const Crypto = require('crypto');
const Nock = require('nock');

const Lab = require('lab');
const lab = exports.lab = Lab.script();

lab.experiment('Reseller API success', () => {

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
      .reply(200, `<?xml version="1.0"?>
        <response>
          <success>true</success>
          <resultcode>10</resultcode>
          <resultmessage>Succesfully claimed the account.</resultmessage>
          <partner_id>1337</partner_id>
          <username>chucknorris</username>
        </response>
      `);

    Mollie.accountClaim({
      username: 'TestUser',
      password: 'TestPassword'
    }, (err, payload) => {

      Assert(err === null);
      Assert(payload.success === 'true');
      Assert(payload.resultcode === '10');
      Assert(payload.resultmessage === 'Succesfully claimed the account.');
      Assert(payload.partner_id === '1337');
      Assert(payload.username === 'chucknorris');
      done();
    });
  });

  lab.test('should succeed to create account', (done) => {

    Nock('https://mollie.com')
      .post('/api/reseller/v1/account-create')
      .reply(200, `<?xml version="1.0" encoding="UTF-8"?>
        <response version="v1">
          <success>true</success>
          <resultcode>10</resultcode>
          <resultmessage>Account created successfully.</resultmessage>
          <username>jandevries</username>
          <password>Vfj@$&amp;MC</password>
          <partner_id>127035</partner_id>
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

      Assert(err === null);
      Assert(payload.version === 'v1');
      Assert(payload.success === 'true');
      Assert(payload.resultcode === '10');
      Assert(payload.resultmessage === 'Account created successfully.');
      Assert(payload.username === 'jandevries');
      Assert(payload.password === 'Vfj@$&MC');
      Assert(payload.partner_id === '127035');
      done();
    });
  });

  lab.test('should succeed to edit account', (done) => {

    Nock('https://mollie.com')
      .post('/api/reseller/v1/account-edit')
      .reply(200, `<?xml version="1.0" encoding="UTF-8"?>
        <response>
          <success>true</success>
          <resultcode>10</resultcode>
          <resultmessage>Account edited successfully.</resultmessage>
          <username>Jan Janssen</username>
          <partner_id>123456</partner_id>
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

      Assert(err === null);
      Assert(payload.success === 'true');
      Assert(payload.resultcode === '10');
      Assert(payload.resultmessage === 'Account edited successfully.');
      Assert(payload.username === 'Jan Janssen');
      Assert(payload.partner_id === '123456');
      done();
    });
  });

  lab.test('should succeed to validate account', (done) => {

    Nock('https://mollie.com')
      .post('/api/reseller/v1/account-valid')
      .reply(200, `<?xml version="1.0"?>
        <response>
          <success>true</success>
          <resultcode>10</resultcode>
          <resultmessage>Customer janjansen exists and password is correct.</resultmessage>
          <exists>true</exists>
          <partner_id>1337</partner_id>
        </response>
      `);

    Mollie.accountValid({
      username: 'TestUser',
      password: 'TestPassword'
    }, (err, payload) => {

      Assert(err === null);
      Assert(payload.success === 'true');
      Assert(payload.resultcode === '10');
      Assert(payload.resultmessage === 'Customer janjansen exists and password is correct.');
      Assert(payload.exists === 'true');
      Assert(payload.partner_id === '1337');
      done();
    });
  });

  lab.test('should succeed to check available payment methods', (done) => {

    Nock('https://mollie.com')
      .post('/api/reseller/v1/available-payment-methods')
      .reply(200, `<?xml version="1.0"?>
        <response>
          <success>true</success>
          <resultcode>10</resultcode>
          <resultmessage>Customer has the following payment services available.</resultmessage>
          <services>
            <ivr>true</ivr>
            <psms>true</psms>
            <ideal>false</ideal>
            <paysafecard>true</paysafecard>
            <creditcard>false</creditcard>
            <mistercash>false</mistercash>
          </services>
        </response>
      `);

    Mollie.availablePaymentMethods({
      username: 'TestUser',
      password: 'TestPassword',
      partner_id_customer: Crypto.randomBytes(4).toString('hex')
    }, (err, payload) => {

      Assert(err === null);
      Assert(payload.success === 'true');
      Assert(payload.resultcode === '10');
      Assert(payload.resultmessage === 'Customer has the following payment services available.');
      Assert(payload.services.ivr === 'true');
      Assert(payload.services.psms === 'true');
      Assert(payload.services.ideal === 'false');
      Assert(payload.services.paysafecard === 'true');
      Assert(payload.services.creditcard === 'false');
      Assert(payload.services.mistercash === 'false');
      done();
    });
  });

  lab.test('should succeed to edit bankaccount', (done) => {

    Nock('https://mollie.com')
      .post('/api/reseller/v1/bankaccount-edit')
      .reply(200, `<?xml version="1.0" encoding="UTF-8"?>
        <response>
          <success>true</success>
          <resultcode>10</resultcode>
          <resultmessage>Bankaccount successfully updated.</resultmessage>
          <bankaccount>
            <id>9d7512a3d2c16b5f9dd49b7aae2d7eaf</id>
            <account_name>JAN JANSEN</account_name>
            <account_iban>NL40RABO0123456789</account_iban>
            <bank_bic>RABONL2U</bank_bic>
            <bank>RABOBANK</bank>
            <location>AMSTERDAM</location>
            <selected>true</selected>
            <verified>false</verified>
          </bankaccount>
        </response>
      `);

    Mollie.bankaccountEdit({
      username: 'TestUser',
      password: 'TestPassword',
      partner_id_customer: Crypto.randomBytes(4).toString('hex'),
      id: Crypto.randomBytes(4).toString('hex')
    }, (err, payload) => {

      Assert(err === null);
      Assert(payload.success === 'true');
      Assert(payload.resultcode === '10');
      Assert(payload.resultmessage === 'Bankaccount successfully updated.');

      Assert(payload.bankaccount.id === '9d7512a3d2c16b5f9dd49b7aae2d7eaf');
      Assert(payload.bankaccount.account_name === 'JAN JANSEN');
      Assert(payload.bankaccount.account_iban === 'NL40RABO0123456789');
      Assert(payload.bankaccount.bank_bic === 'RABONL2U');
      Assert(payload.bankaccount.bank === 'RABOBANK');
      Assert(payload.bankaccount.location === 'AMSTERDAM');
      Assert(payload.bankaccount.selected === 'true');
      Assert(payload.bankaccount.verified === 'false');
      done();
    });
  });

  lab.test('should succeed to get single bankaccount', (done) => {

    Nock('https://mollie.com')
      .post('/api/reseller/v1/bankaccounts')
      .reply(200, `<?xml version="1.0"?>
        <response>
          <items>
            <bankaccount>
              <id>9d7512a3d2c16b5f9dd49b7aae2d7eaf</id>
              <account_name>JAN JANSEN</account_name>
              <account_iban>NL40RABO0123456789</account_iban>
              <bic_code>RABONL2U</bic_code>
              <bank>RABOBANK</bank>
              <location>AMSTERDAM</location>
              <selected>true</selected>
              <verified>false</verified>
            </bankaccount>
          </items>
        </response>
      `);

    Mollie.bankaccounts({
      username: 'TestUser',
      password: 'TestPassword',
      partner_id_customer: Crypto.randomBytes(4).toString('hex')
    }, (err, payload) => {

      Assert(err === null);
      const bankaccount = payload[0];
      Assert(bankaccount.id === '9d7512a3d2c16b5f9dd49b7aae2d7eaf');
      done();
    });
  });

  lab.test('should succeed to get multiple bankaccounts', (done) => {

    Nock('https://mollie.com')
      .post('/api/reseller/v1/bankaccounts')
      .reply(200, `<?xml version="1.0"?>
        <response>
          <items>
            <bankaccount>
              <id>9d7512a3d2c16b5f9dd49b7aae2d7eae</id>
              <account_name>JAN JANSEN</account_name>
              <account_iban>NL40RABO0123456789</account_iban>
              <bic_code>RABONL2U</bic_code>
              <bank>RABOBANK</bank>
              <location>AMSTERDAM</location>
              <selected>true</selected>
              <verified>false</verified>
            </bankaccount>
            <bankaccount>
              <id>9d7512a3d2c16b5f9dd49b7aae2d7eaf</id>
              <account_name>JAN JANSEN</account_name>
              <account_iban>NL40RABO0123456789</account_iban>
              <bic_code>RABONL2U</bic_code>
              <bank>RABOBANK</bank>
              <location>AMSTERDAM</location>
              <selected>true</selected>
              <verified>false</verified>
            </bankaccount>
          </items>
        </response>
      `);

    Mollie.bankaccounts({
      username: 'TestUser',
      password: 'TestPassword',
      partner_id_customer: Crypto.randomBytes(4).toString('hex')
    }, (err, payload) => {

      Assert(err === null);
      Assert(payload[0].id === '9d7512a3d2c16b5f9dd49b7aae2d7eae');
      Assert(payload[1].id === '9d7512a3d2c16b5f9dd49b7aae2d7eaf');
      done();
    });
  });

  lab.test('should succeed to disconnect account', (done) => {

    Nock('https://mollie.com')
      .post('/api/reseller/v1/disconnect-account')
      .reply(200, `<?xml version="1.0" encoding="UTF-8"?>
        <response>
          <success>true</success>
          <resultcode>10</resultcode>
          <resultmessage>Account disconnected successfully.</resultmessage>
        </response>
      `);

    Mollie.disconnectAccount({
      username: 'TestUser',
      password: 'TestPassword',
      partner_id_customer: Crypto.randomBytes(4).toString('hex')
    }, (err, payload) => {

      Assert(err === null);
      Assert(payload.success === 'true');
      Assert(payload.resultcode === '10');
      Assert(payload.resultmessage === 'Account disconnected successfully.');
      done();
    });
  });

  lab.test('should succeed to get login link', (done) => {

    Nock('https://mollie.com')
      .post('/api/reseller/v1/get-login-link')
      .reply(200, `<?xml version="1.0" encoding="UTF-8"?>
        <response version="v1">
          <success>true</success>
          <resultcode>10</resultcode>
          <resultmessage>Redirect the customer to the following url.</resultmessage>
          <redirect_url>https://www.mollie.com/login/oneTimeLogin/4299193/008788d1a618c3aff51acd57ca82661c?redirect_url=%2Fbeheer%2Fbetaalmethodes%2F</redirect_url>
        </response>
      `);

    Mollie.getLoginLink({
      username: 'TestUser',
      password: 'TestPassword',
      partner_id_customer: Crypto.randomBytes(4).toString('hex')
    }, (err, payload) => {

      Assert(err === null);
      Assert(payload.version === 'v1');
      Assert(payload.success === 'true');
      Assert(payload.resultcode === '10');
      Assert(payload.resultmessage === 'Redirect the customer to the following url.');
      Assert(payload.redirect_url === 'https://www.mollie.com/login/oneTimeLogin/4299193/008788d1a618c3aff51acd57ca82661c?redirect_url=%2Fbeheer%2Fbetaalmethodes%2F');
      done();
    });
  });

  lab.test('should succeed to create profile', (done) => {

    Nock('https://mollie.com')
      .post('/api/reseller/v1/profile-create')
      .reply(200, `<?xml version="1.0" encoding="UTF-8"?>
        <response version="v1">
          <success>true</success>
          <resultcode>10</resultcode>
          <resultmessage>Profile created successfully</resultmessage>
          <profile>
            <name>Snoep.nl</name>
            <hash>9C696E36</hash>
            <website>http://snoep.nl/</website>
            <sector>6</sector>
            <category>5399</category>
            <verified>false</verified>
            <phone>0201234567</phone>
            <email>info@snoep.nl</email>
            <api_keys>
              <test>test_ImXWtEB4alZ149cxDrLxr1XDt8kbI9</test>
              <live>live_DjymcBSCZX4MijQ2RKHGTmAvB4J4xw</live>
            </api_keys>
          </profile>
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

      Assert(err === null);
      Assert(payload.version === 'v1');
      Assert(payload.success === 'true');
      Assert(payload.resultcode === '10');
      Assert(payload.resultmessage === 'Profile created successfully');
      const profile = payload.profile;
      Assert(profile.name === 'Snoep.nl');
      Assert(profile.hash === '9C696E36');
      Assert(profile.website === 'http://snoep.nl/');
      Assert(profile.sector === '6');
      Assert(profile.category === '5399');
      Assert(profile.verified === 'false');
      Assert(profile.phone === '0201234567');
      Assert(profile.email === 'info@snoep.nl');
      Assert(profile.api_keys.test === 'test_ImXWtEB4alZ149cxDrLxr1XDt8kbI9');
      Assert(profile.api_keys.live === 'live_DjymcBSCZX4MijQ2RKHGTmAvB4J4xw');
      done();
    });
  });

  lab.test('should succeed to get single profile', (done) => {

    Nock('https://mollie.com')
      .post('/api/reseller/v1/profiles')
      .reply(200, `<?xml version="1.0"?>
        <response>
          <items>
            <profile>
              <name>Snoep.nl</name>
              <hash>9C696E36</hash>
              <website>http://snoep.nl/</website>
              <sector>6</sector>
              <category>5399</category>
              <verified>true</verified>
              <phone>0201234567</phone>
              <email>info@snoep.nl</email>
              <api_keys>
                <test>test_ImXWtEB4alZ149cxDrLxr1XDt8kbI9</test>
                <live>live_DjymcBSCZX4MijQ2RKHGTmAvB4J4xw</live>
              </api_keys>
            </profile>
          </items>
        </response>`
      );

    Mollie.profiles({
      username: 'TestUser',
      password: 'TestPassword',
      partner_id_customer: Crypto.randomBytes(4).toString('hex')
    }, (err, payload) => {

      Assert(err === null);
      const profile = payload[0];
      Assert(profile.name === 'Snoep.nl');
      Assert(profile.hash === '9C696E36');
      Assert(profile.website === 'http://snoep.nl/');
      Assert(profile.sector === '6');
      Assert(profile.category === '5399');
      Assert(profile.verified === 'true');
      Assert(profile.phone === '0201234567');
      Assert(profile.email === 'info@snoep.nl');
      Assert(profile.api_keys.test === 'test_ImXWtEB4alZ149cxDrLxr1XDt8kbI9');
      Assert(profile.api_keys.live === 'live_DjymcBSCZX4MijQ2RKHGTmAvB4J4xw');
      done();
    });
  });

  lab.test('should succeed to get multiple profiles', (done) => {

    Nock('https://mollie.com')
      .post('/api/reseller/v1/profiles')
      .reply(200, `<?xml version="1.0"?>
        <response>
          <items>
            <profile>
              <name>Snoep.nl</name>
              <hash>9C696E36</hash>
              <website>http://snoep.nl/</website>
              <sector>6</sector>
              <category>5399</category>
              <verified>true</verified>
              <phone>0201234567</phone>
              <email>info@snoep.nl</email>
              <api_keys>
                <test>test_ImXWtEB4alZ149cxDrLxr1XDt8kbI9</test>
                <live>live_DjymcBSCZX4MijQ2RKHGTmAvB4J4xw</live>
              </api_keys>
            </profile>
            <profile>
              <name>Snoep.nl</name>
              <hash>9C696E36</hash>
              <website>http://snoep.nl/</website>
              <sector>6</sector>
              <category>5399</category>
              <verified>true</verified>
              <phone>0201234567</phone>
              <email>info@snoep.nl</email>
              <api_keys>
                <test>test_ImXWtEB4alZ149cxDrLxr1XDt8kbI9</test>
                <live>live_DjymcBSCZX4MijQ2RKHGTmAvB4J4xw</live>
              </api_keys>
            </profile>
          </items>
        </response>`
      );

    Mollie.profiles({
      username: 'TestUser',
      password: 'TestPassword',
      partner_id_customer: Crypto.randomBytes(4).toString('hex')
    }, (err, payload) => {

      Assert(err === null);
      payload.forEach((profile) => {

        Assert(profile.name === 'Snoep.nl');
        Assert(profile.hash === '9C696E36');
        Assert(profile.website === 'http://snoep.nl/');
        Assert(profile.sector === '6');
        Assert(profile.category === '5399');
        Assert(profile.verified === 'true');
        Assert(profile.phone === '0201234567');
        Assert(profile.email === 'info@snoep.nl');
        Assert(profile.api_keys.test === 'test_ImXWtEB4alZ149cxDrLxr1XDt8kbI9');
        Assert(profile.api_keys.live === 'live_DjymcBSCZX4MijQ2RKHGTmAvB4J4xw');
      });
      done();
    });
  });

  lab.test('should succeed to set fees', (done) => {

    Nock('https://mollie.com')
      .post('/api/reseller/v1/set-fees')
      .reply(200, `<?xml version="1.0"?>
        <response>
          <success>true</success>
          <resultcode>10</resultcode>
          <resultmessage>Fee for payment method iDEAL set to &#x20AC; 0,22 per transaction.</resultmessage>
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

      Assert(err === null);
      Assert(payload.success === 'true');
      Assert(payload.resultcode === '10');
      Assert(payload.resultmessage === 'Fee for payment method iDEAL set to € 0,22 per transaction.');
      done();
    });
  });
});
