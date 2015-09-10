var expect = require('chai').expect;

describe('DNS Made Easy module', function() {

  var client = require('./');

  it('exposes a createClient function', function() {
    expect(client.createClient).to.be.ok;
  });

  it('exposes the ManagedDns module', function() {
    expect(client.ManagedDNS).to.be.ok;
  });

  it('exposes the Usage module', function() {
    expect(client.Usage).to.be.ok;
  });

});
