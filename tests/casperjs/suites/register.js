// Add a title comment so that you know what's happening and when
casper.test.comment('Scenario - Register new user and verify logged in');

/**
 * Initialize CasperJS and point it to test.oae.com
 */
casper.start('http://test.oae.com');

/**
 * Assert that the register button is present and trigger the modal
 */
casper.waitForSelector('.oae-trigger-register', function() {
    casper.test.assertExists('.oae-trigger-register', 'Assert register button exists and click');
    casper.click('.oae-trigger-register');
});

/**
 * Fill in the register form and submit
 */
casper.waitForSelector('form#register-form', function() {
    casper.test.assertExists('input[name="firstName"]', 'Assert firstname input exists and fill');
    casper.test.assertExists('input[name="lastName"]', 'Assert lastname input exists and fill');
    casper.test.assertExists('input[name="email"]', 'Assert email input exists and fill');
    casper.test.assertExists('input[name="username"]', 'Assert username input exists and fill');
    casper.test.assertExists('input[name="password"]', 'Assert password input exists and fill');
    casper.test.assertExists('input[name="password_repeat"]', 'Assert password repeat input exists and fill');

    casper.fill('form#register-form', {
        'firstName': 'John',
        'lastName': 'Doe',
        'email': 'jd@gmail.com',
        'username': 'johndoe-' + new Date().getTime(),
        'password': 'testtest',
        'password_repeat': 'testtest'
    }, false);
    casper.test.assertExists('#register-create-account', 'Assert submit register form button exists and click');
    casper.click('#register-create-account');
});

/**
 * Assert that the user is logged in and has the correct name
 */
casper.waitForSelector('#me-clip-container h1', function() {
    casper.test.assertExists('#me-clip-container h1', 'Assert user is logged in');
    casper.test.assertSelectorHasText('#me-clip-container h1', 'John Doe', 'Logged in user is John Doe');
    casper.click('#topnavigation-signout');
});

casper.run(function() {
    this.test.done();
});
