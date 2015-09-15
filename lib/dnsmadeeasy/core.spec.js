'use strict';

var crypto = require('crypto');

var nock = require('nock');
var expect = require('chai').expect;
var core = require('./core');

describe('Core', function() {
  var options;

  before(function() {
    options = {
      apikey: 'testApiKey',
      secret: 'testSecret',
      debug: true
    };
  });

  it('exists', function() {
    expect(core).to.be.ok;
    expect(core.createClient).to.be.ok;
  });

  describe('createClient', function() {
    it('throws an error if no options are passed', function() {
      try {
        core.createClient();
      } catch (ex) {
        return expect(ex.message).to.be.eql('An options object is required');
      }

      throw new Error('Should not get here.');
    });

    it('gets instanciated wtih the correct options', function() {
      var client = core.createClient(options);

      expect(client).to.be.ok;
      expect(client.apikey).to.be.eql('testApiKey');
      expect(client.secret).to.be.eql('testSecret');
      expect(client.host).to.be.eql('api.sandbox.dnsmadeeasy.com');
    });
  });

  describe('GET', function() {
    it('sends a request to the correct URI', function* () {
      var headers = {
        test: 'test'
      };

      nock('https://api.sandbox.dnsmadeeasy.com/V2.0', {
        reqheaders: headers
      })
        .get('/test')
        .reply(200, {
          status: 'ok'
        });

      var client = core.createClient(options);
      this.sandbox.stub(client, '_generateHeaders', function() {
        return headers;
      });

      var response = yield client.get(['test']);
      expect(response).to.be.eql({
        status: 'ok'
      });
    });
  });

  describe('PUT', function() {
    it('sends a request to the correct URI', function* () {
      var headers = {
        test: 'test'
      };

      var payload = {
        data: 'test'
      };

      nock('https://api.sandbox.dnsmadeeasy.com/V2.0', {
        reqheaders: headers
      })
        .put('/test', payload)
        .reply(200, {
          status: 'ok'
        });

      var client = core.createClient(options);
      this.sandbox.stub(client, '_generateHeaders', function() {
        return headers;
      });

      var response = yield client.put(['test'], payload);
      expect(response).to.be.eql({
        status: 'ok'
      });
    });
  });

  describe('POST', function() {
    it('sends a request to the correct URI', function* () {
      var headers = {
        test: 'test'
      };

      var payload = {
        data: 'test'
      };

      nock('https://api.sandbox.dnsmadeeasy.com/V2.0', {
        reqheaders: headers
      })
        .post('/test', payload)
        .reply(200, {
          status: 'ok'
        });

      var client = core.createClient(options);
      this.sandbox.stub(client, '_generateHeaders', function() {
        return headers;
      });

      var response = yield client.post(['test'], payload);
      expect(response).to.be.eql({
        status: 'ok'
      });
    });
  });

  describe('DELETE', function() {
    it('sends a request to the correct URI', function* () {
      var headers = {
        test: 'test'
      };

      nock('https://api.sandbox.dnsmadeeasy.com/V2.0', {
        reqheaders: headers
      })
        .delete('/test')
        .reply(200, {
          status: 'ok'
        });

      var client = core.createClient(options);
      this.sandbox.stub(client, '_generateHeaders', function() {
        return headers;
      });

      var response = yield client.delete(['test']);
      expect(response).to.be.eql({
        status: 'ok'
      });
    });
  });

  describe('#utils', function() {
    describe('_generateHeaders', function() {
      it('gets generates proper headers', function() {
        var client = core.createClient(options);

        this.sandbox.stub(Date.prototype, 'toGMTString', function() {
          return 'abc';
        });

        var headers = client._generateHeaders();
        expect(headers).to.be.eql({
          'x-dnsme-apikey': 'testApiKey',
          'x-dnsme-requestDate': 'abc',
          'x-dnsme-hmac': crypto.createHmac('sha1', 'testSecret').update('abc').digest('hex'),
          'content-type': 'application/json'
        });
      });
    });

    describe('_buildURI', function() {
      it('returns with proper uri', function() {
        var client = core.createClient(options);

        var uri = client._buildURI(['test', 'route', 'params']);
        expect(uri).to.be.eql('https://api.sandbox.dnsmadeeasy.com/V2.0/test/route/params');
      });
    });

    describe('_sendRequest', function() {
      it('sends out a request and returns with a promise', function* () {
        nock('http://test.com')
          .get('/test')
          .reply(200, {
            status: 'ok'
          });

        var client = core.createClient(options);

        var requestParams = {
          method: 'GET',
          uri: 'http://test.com/test'
        };

        var response = yield client._sendRequest(requestParams);
        expect(response).to.be.eql({
          status: 'ok'
        });
      });

      it('sends out a request and returns with an error', function* () {
        nock('http://test.com')
          .get('/test')
          .replyWithError('something awful happened');

        var client = core.createClient(options);

        var requestParams = {
          method: 'GET',
          uri: 'http://test.com/test'
        };

        try {
          yield client._sendRequest(requestParams);
        } catch (ex) {
          return expect(ex.message).to.be.eql('something awful happened');
        }

        throw new Error('Should not get here.');
      });
    });
  });
});
