'use strict';

var nock = require('nock');
var expect = require('chai').expect;
var core = require('./core');
var Usage = require('./usage');

describe('Usage', function() {
  var client;
  var headers;
  var payload;

  beforeEach(function() {
    client = core.createClient({
      apikey: 'testApiKey',
      secret: 'testSecret',
      debug: true
    });
    this.sandbox.stub(client, '_generateHeaders', function() {
      return headers;
    });

    headers = {
      test: 'test'
    };

    payload = {
      data: 'test'
    };
  });

  it('exists', function() {
    expect(Usage).to.be.ok;
    expect(Usage.create).to.be.ok;
  });

  describe('getUsage', function() {

    it('returns with correct response', function* () {
      nock('https://api.sandbox.dnsmadeeasy.com/V2.0', {
        reqheaders: headers
      })
        .get('/usageApi/queriesApi')
        .reply(200, {
          status: 'ok'
        });

      var usage = Usage.create(client);

      var response = yield usage.getUsage();
      expect(response).to.be.eql({
        status: 'ok'
      });
    });
  });

});
