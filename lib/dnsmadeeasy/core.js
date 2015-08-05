var crypto = require('crypto');
var request = require('request');

exports.createClient = function (options) {
  return new Client(options);
};


var Client = exports.Client = function (options) {
  if (!options) throw new Error('An options object is required');
  this.config = options;
  this.debug = (options.debug || false);
  this.apikey = options.apikey;
  this.secret = options.secret;
  this.host = (this.debug == true) ? 'api.sandbox.dnsmadeeasy.com' : 'api.dnsmadeeasy.com';
};

Client.prototype.generateHeaders = function () {
  var date = new Date().toGMTString();
  return {
    'x-dnsme-apikey': this.apikey,
    'x-dnsme-requestDate': date,
    'x-dnsme-hmac': crypto.createHmac('sha1', this.secret).update(date).digest('hex'),
    'content-type': 'application/json'
  };
};

Client.prototype.buildURI = function (args) {
  var self = this;
  return 'https://' + self.host + '/V2.0/' + args.join('/');
};

Client.prototype.get = function () {
  var self = this,
    args = Array.prototype.slice.call(arguments),
    cb = (typeof(args[args.length - 1]) === 'function') && args.pop();


  var uri = self.buildURI(args);
  console.log('URI: ' + uri);
  var opts = {
    uri: uri,
    headers: self.generateHeaders()
  };

  request(opts, function (err, res, body) {
    if (err) return cb(err);
    var output = JSON.parse(body);
    if (output) {
      cb(null, output);
    } else {
      cb(body);
    }
  });
};

Client.prototype.put = function () {
  var self = this,
    args = Array.prototype.slice.call(arguments),
    cb = (typeof(args[args.length - 1]) === 'function') && args.pop(),
    putData = (typeof(args[args.length - 1]) === 'object') && args.pop();


  var uri = self.buildURI(args);

  var opts = {
    uri: uri,
    headers: self.generateHeaders(),
    body: JSON.stringify(putData),
    method: "PUT"
  };

  request(opts, function (err, res, body) {
    if (err) return cb(err);
    var output = JSON.parse(body);
    if (output) {
      cb(null, output);
    } else {
      cb(body);
    }
  });
};

Client.prototype.post = function () {
  var self = this;
  var args = Array.prototype.slice.call(arguments);
  var cb = (typeof(args[args.length - 1]) === 'function') && args.pop();
  var postData = (typeof(args[args.length - 1]) === 'object') && args.pop();


  var uri = self.buildURI(args);

  var opts = {
    uri: uri,
    headers: self.generateHeaders(),
    body: JSON.stringify(postData),
    method: "POST"
  };

  request(opts, function (err, res, body) {
    if (err) return cb(err);
    var output = JSON.parse(body);
    if (output) {
      cb(null, output);
    } else {
      cb(body);
    }
  });
};

Client.prototype.delete = function () {
  var self = this,
    args = Array.prototype.slice.call(arguments),
    cb = (typeof(args[args.length - 1]) === 'function') && args.pop();


  var uri = self.buildURI(args);

  var opts = {
    uri: uri,
    headers: self.generateHeaders(),
    method: 'delete'
  };

  request(opts, function (err, res, body) {
    if (err) return cb(err);
    var output = JSON.parse(body);
    if (output) {
      cb(null, output);
    } else {
      cb(body);
    }
  });
};
