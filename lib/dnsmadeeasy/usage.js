var _ = require('lodash');
var Promise = Promise || require('bluebird');

/**
 * @method create
 * @param client
 */
exports.create = function(client) {
  return new Usage(client);
};

/**
 * @method Usage
 * @param {Object} client
 */
function Usage(client) {
  if (!client) {
    throw new Error('Usage must be constructed with a client');
  }

  this.client = client;
}

_.extend(Usage.prototype, {

  /**
   * @method getUsage
   */
  getUsage: function() {
    return this.client.get(['usageApi', 'queriesApi']);
  }
});
