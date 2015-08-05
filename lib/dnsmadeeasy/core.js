var util = require('util');
var crypto = require('crypto');

var request = require('request');
var Promise = Promise || require('bluebird');
var _ = require('lodash');

/**
 * @method createClient
 * @param {Object} options
 */
exports.createClient = function(options) {
  return new Client(options);
};

/**
 * @method Client
 * @param {Object} options
 */
function Client(options) {
  if (!options) {
    throw new Error('An options object is required');
  }

  this.apikey = options.apikey;
  this.secret = options.secret;
  this.host = options.debug ? 'api.sandbox.dnsmadeeasy.com' : 'api.dnsmadeeasy.com';
};

_.extend(Client.prototype, {

  /**
   * @method get
   * @param {Array} routeParams
   */
  get: function(routeParams) {
    var options = {
      uri: this._buildURI(routeParams),
      headers: this._generateHeaders(),
      method: 'GET'
    };

    return this._sendRequest(options);
  },

  /**
   * @method put
   * @param {Array} routeParams
   * @param {Object} payload
   */
  put: function(routeParams, payload) {
    var options = {
      uri: this._buildURI(routeParams),
      headers: this._generateHeaders(),
      body: JSON.stringify(payload),
      method: 'PUT'
    };

    return this._sendRequest(options);
  },

  /**
   * @method post
   * @param {Array} routeParams
   * @param {Object} payload
   */
  post: function(routeParams, payload) {
    var options = {
      uri: this._buildURI(routeParams),
      headers: this._generateHeaders(),
      body: JSON.stringify(payload),
      method: 'POST'
    };

    return this._sendRequest(options);
  },

  /**
   * @method delete
   * @param {Array} routeParams
   */
  delete: function(routeParams) {
    var options = {
      uri: this._buildURI(routeParams),
      headers: this._generateHeaders(),
      method: 'DELETE'
    };

    return this._sendRequest(options);
  },

  /**
   * @method _sendRequest
   * @param {Object} options
   */
  _sendRequest: function(options) {
    return new Promise(function(resolve, reject) {
      request(options, function(err, res, body) {
        if (err) {
          return reject(err);
        }
        resolve(JSON.parse(body));
      });
    });
  },

  /**
   * @method _generateHeaders
   */
  _generateHeaders: function() {
    var date = new Date().toGMTString();
    return {
      'x-dnsme-apikey': this.apikey,
      'x-dnsme-requestDate': date,
      'x-dnsme-hmac': crypto.createHmac('sha1', this.secret).update(date).digest('hex'),
      'content-type': 'application/json'
    };
  },

  /**
   * @method _buildURI
   * @param {Array} routeParams
   */
  _buildURI: function(routeParams) {
    return util.format('https://%s/V2.0/%s', this.host, routeParams.join('/'));
  }
});
