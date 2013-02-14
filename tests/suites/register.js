// Add a title comment so that you know what's happening and when
casper.test.comment('Sakai OAE - Register new user');

var testTime = new Date().getTime();

var takeScreenshot = function() {
    casper.waitForSelector('html', function() {
        this.captureSelector('screenshots/' + testTime + '/' + new Date().getTime() + '.png', 'html');
    });
};

/**
 * Initialize CasperJS and point it to cam.oae.com
 */
casper.start('http://cam.oae.com', function () {
    // Set the size of the viewport
    casper.viewport(1600, 1200);
});

/**
 * Navigate to the register page from the landing page
 */
casper.waitForSelector('a[href="/register"]', function() {
    casper.test.info("     # Verify navigating to register page from landing page");

    this.test.assertExists('#topnavigation_left a[href="/register"]');
    this.click('#topnavigation_left a[href="/register"]');
    takeScreenshot();
});

/**
 * Fill out and submit the register form
 */
casper.waitForSelector('form#register_form', function() {
    casper.test.info("     # Fill out and submit the register form");

    this.test.assertTitle('Sakai OAE - Sign up');
    this.fill('form#register_form', {
        'firstName': 'John',
        'lastName': 'Doe',
        'email': 'jd@gmail.com',
        'username': 'johndoe-' + new Date().getTime(),
        'password': 'testtest',
        'password_repeat': 'testtest'
    }, false);

    takeScreenshot();

    this.wait(1000, function() {
        this.click('#register_create_account');
        takeScreenshot();
    });
});

// Run the whole test suite (all the above)
casper.run(function () {
    // Confirm this test is done
    this.test.done();
});
