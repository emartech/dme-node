var _ = require('lodash');
var Promise = Promise || require('bluebird');

/**
 * @method createManagedDNS
 * @param cliet
 */
exports.createManagedDNS = function(cliet) {
  return new ManagedDNS(cliet);
};

/**
 * @method ManagedDNS
 * @param {Object} client
 */
function ManagedDNS(client) {
  if (!client) {
    throw new Error('ManagedDNS must be constructed with a client');
  }

  this.client = client;
};

_.extend(ManagedDNS.prototype, {
  /**
   * SINGLE DOMAIN ACTIONS
   */

  /**
   * @method ManagedDNS
   * @param {Object} client
   */
  getDomain: function(id) {
    if (!id) {
      return Promise.reject(new Error('Invalid domain id given'));
    }

    return this.client.get(['dns', 'managed', id]);
  },

  /**
   * @method createDomain
   * @param {Object} payload
   */
  createDomain: function(payload) {
    if (!payload) {
      return Promise.reject(new Error('Must supply payload to create domain'));
    }

    return this.client.post(['dns', 'managed'], payload);
  },

  /**
   * @method updateDomain
   * @param {String} id
   * @param {Object} payload
   */
  updateDomain: function(id, payload) {
    if (!id) {
      return Promise.reject(new Error('Invalid domain id given'));
    }

    if (!payload) {
      return Promise.reject(new Error('Must supply payload to edit specified domain'));
    }

    return this.client.put(['dns', 'managed', id], payload);
  },

  /**
   * @method deleteDomain
   * @param {String} id
   */
  deleteDomain: function(id) {
    if (!id) {
      return Promise.reject(new Error('Invalid domain id given'));
    }

    return this.client.delete(['dns', 'managed', id]);
  },

  /**
   * MULTIDOMAIN ACTIONS
   */

  /**
   * @method getAllDomains
   */
  getAllDomains: function() {
    return this.client.get(['dns', 'managed']);
  },

  /**
   * @method createMultipleDomains
   * @param {Object} payload
   */
  createMultipleDomains: function(payload) {
    if (!payload) {
      return Promise.reject(new Error('Must supply payload to create domain'));
    }

    return this.client.post(['dns', 'managed'], payload);
  },

  /**
   * @method updateMultipleDomains
   * @param {Object} payload
   */
  updateMultipleDomains: function(payload) {
    if (!payload) {
      return Promise.reject(new Error('Must supply payload to edit domains'));
    }

    return this.client.put(['dns', 'managed'], payload);
  },

  /**
   * @method removeMultipleDomains
   * @param {Object} payload
   */
  deleteMultipleDomains: function(payload) {
    if (!payload) {
      return Promise.reject(new Error('Must supply payload to remove domain'));
    }

    return this.client.delete(['dns', 'managed'], payload);
  },

  /**
   * SIGNLE RECORD ACTIONS
   */

  // TODO getRecordForDomain

  /**
   * @method createRecordForDomain
   * @param {String} domainId
   * @param {Object} payload
   */
  createRecordForDomain: function(domainId, payload) {
    if (!domainId) {
      return Promise.reject(new Error('Invalid domain id given'));
    }

    if (!payload) {
      return Promise.reject(new Error('Must supply payload to create record for specified domain'));
    }

    return this.client.post(['dns', 'managed', domainId, 'records'], payload);
  },

  /**
   * @method updateRecordForDomain
   * @param {String} domainId
   * @param {String} recordId
   * @param {Object} payload
   */
  updateRecordForDomain: function(domainId, recordId, payload) {
    if (!domainId) {
      return Promise.reject(new Error('Invalid domain id given'));
    }

    if (!recordId) {
      return Promise.reject(new Error('Invalid record id given'));
    }

    if (!payload) {
      return Promise.reject(new Error('Must supply payload to create record for specified domain'));
    }

    return this.client.put(['dns', 'managed', domainId, 'records', recordId], payload);
  },

  /**
   * @method deleteRecordForDomain
   * @param {String} domainId
   * @param {String} recordId
   */
  deleteRecordForDomain: function(domainId, recordId) {
    if (!domainId) {
      return Promise.reject(new Error('Invalid domain id given'));
    }

    if (!recordId) {
      return Promise.reject(new Error('Invalid record id given'));
    }

    return this.client.delete(['dns', 'managed', domainId, 'records', recordId]);
  },

  /**
   * MULTIRECORD ACTIONS
   */

  /**
   * @method getRecordsForDomain
   * @param {String} domainId
   */
  getRecordsForDomain: function(domainId) {
    if (!domainId) {
      return Promise.reject(new Error('Invalid domain id given'));
    }

    return this.client.get(['dns', 'managed', domainId, 'records']);
  },

  /**
   * @method createRecordsForDomain
   * @param {String} domainId
   * @param {Object} payload
   */
  createRecordsForDomain: function(domainId, payload) {
    if (!domainId) {
      return Promise.reject(new Error('Invalid domain id given'));
    }

    if (!payload) {
      return Promise.reject(new Error('Must supply payload to create record for specified domain'));
    }

    return this.client.post(['dns', 'managed', domainId, 'records', 'createMulti'], payload);
  },

  /**
   * @method updateRecordsForDomain
   * @param {String} domainId
   * @param {Object} payload
   */
  updateRecordsForDomain: function(domainId, payload) {
    if (!domainId) {
      return Promise.reject(new Error('Invalid domain id given'));
    }

    if (!payload) {
      return Promise.reject(new Error('Must supply payload to create record for specified domain'));
    }

    return this.client.put(['dns', 'managed', domainId, 'records', 'updateMulti'], payload);
  }

});
