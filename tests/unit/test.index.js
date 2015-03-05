'use strict';

var nodemock = require('nodemock');

var uninstallApp = require('../../index');

module.exports = {

  'uninstallApp() should fail when missing client option': function(test) {
    uninstallApp({
      manifestURL: '...'
    }).then(function(results) {
      test.ok(false);
      test.done();
    }).catch(function(err) {
      test.done();
    });
  },

  'uninstallApp() should fail when missing manifestURL option': function(test) {
    uninstallApp({
      client: {}
    }).then(function(results) {
      test.ok(false);
      test.done();
    }).catch(function(err) {
      test.done();
    });
  },

  'uninstallApp() should uninstall a given app': function(test) {

    var MANIFEST_URL = 'app://8675309/manifest.webapp';
    var UNINSTALL_RESULT = 'expected result';

    var mocked = nodemock
      .mock('uninstall')
        .takes(MANIFEST_URL, function() {})
        .calls(1, [null, UNINSTALL_RESULT]);

    var mockClient = {
      getWebapps: function(webappsCallback) {
        webappsCallback(null, { uninstall: mocked.uninstall });
      }
    };

    uninstallApp({
      client: mockClient,
      manifestURL: MANIFEST_URL
    }).then(function(result) {
      test.ok(mocked.assert());
      test.equal(result, UNINSTALL_RESULT);
      test.done();
    }).catch(function(err) {
      test.ifError(err);
      test.done();
    });

  }

};
