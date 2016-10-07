# geenen-mollie

[![Build Status](https://travis-ci.org/GlennGeenen/geenen-mollie.svg?branch=master)](https://travis-ci.org/GlennGeenen/geenen-mollie)

Unofficial implementation of the mollie-reseller API for node. This package is created
because some other implementations are outdated or bloated.

All available methods are supported. An error object is returned if the request did not succeed.

https://www.mollie.com/nl/support/post/documentatie-reseller-api

## About

Mollie is a Payment Service Provider from the Netherlands. They allow you to create
new customers through their reseller API as part of your platform integration.

The following API methods are supported:

* account-claim
* account-create
* account-edit
* account-valid
* available-payment-methods
* bankaccount-edit
* bankaccounts ( returns array of bankaccounts )
* disconnect-account
* get-login-link
* profile-create
* profiles ( returns array of profiles )
* set-fees

## Installation problems

If you get installation errors you should check [node-expat](https://github.com/astro/node-expat) requirements.

## Example

The folowing is an example of how to create a new Mollie account for your customer.
You will need to sign up for a mollie account and the reseller program in order to
retrieve the correct credentials. Check the tests for more examples.

```javascript
    const Mollie = require('geenen-mollie');

    Mollie.configure({
        partner_id: '<MOLLIE_PARTNER_ID>',
        profile_key: '<MOLLIE_PROFILE_KEY>',
        app_secret: '<MOLLIE_APP_SECRET>'
    });

    Mollie.accountCreate({
        testmode: 1,
        username: 'glenngeenen',
        name: 'Glenn Geenen',
        company_name: 'GeenenTijd',
        email: 'glenn@geenentijd.be',
        address: 'My Address 1',
        zipcode: '1000',
        city: 'Brussels',
        country: 'BE'
    }, function(err, result) {
        console.log(result);

        // {
        //     success: 'true',
        //     resultmessage: 'Account created successfully.',
        //     username: 'glenngeenen',
        //     password: 'Vfj@$&MC',
        //     partner_id: '123456'
        // }
    });
````
