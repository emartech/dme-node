/**
 * Module depends
 */
var utils = require('./utils');


var ManagedDNS = exports.ManagedDNS = function(client) {
	if (!client) throw new Error('ManagedDNS must be constructed with a client');
	
	this.client = client;
};

ManagedDNS.prototype = {
	getAllDomains: function() {
		var args = utils.getArgs(arguments),
			cb = (typeof(args[args.length - 1]) === 'function') && args.pop();
		var self = this;
		self.client.get('dns', 'managed', function(err, data) {
			if (err) return cb(err);
			cb(null, data);
		});
	},

	
	updateAllDomains: function() {

		var args = utils.getArgs(arguments),
			cb = (typeof(args[args.length - 1]) === 'function') && args.pop(),
			putData = (typeof(args[args.length - 1]) === 'object') && args.pop();
			
		if (!putData) return cb({status: 'error', message: 'Must supply data envelope to edit specified domain'});
	    var self = this;
	    self.client.put('dns', 'managed', putData, function(err, data) {
		    if (err) return cb(err);
		    cb(null, data);
	    });
	},
	
	createDomains: function() {
		var args = utils.getArgs(arguments),
			cb = (typeof(args[args.length - 1]) === 'function') && args.pop(),
			postData = (typeof(args[args.length - 1]) === 'object') && args.pop();
			
		var self = this;
		self.client.post('dns', 'managed', postData, function(err, data) {
			if (err) return cb(err);
			cb(null, data);
		});
	},
	
	getDomain: function() {
		var args = utils.getArgs(arguments),
			cb = (typeof(args[args.length - 1]) === 'function') && args.pop();
		
		if (args.length == 0) {
			return cb({status: 'error', message: 'Invalid domain id given'});
		}
		
		var domain_id = args[0];
		
		var self = this;
		self.client.get('dns', 'managed', domain_id, function(err, data) {
			if (err) return cb(err);
			cb(null, data);
		});
	},
	
	deleteDomain: function() {
		var args = utils.getArgs(arguments),
			cb = (typeof(args[args.length - 1]) === 'function') && args.pop(),
			domain_id = (typeof(args[args.length - 1]) === 'string') && args.pop();
			
		if (!domain_id) return cb({status: 'error', message: 'Invalid domain id given'});
		var self = this;
		self.client.delete('dns', 'managed', domain_id, function(err, data){
			if (err) return cb(err);
			cb(null, data);
		});
	},
	
	updateDomain: function() {
	    var args = utils.getArgs(arguments),
			cb = (typeof(args[args.length - 1]) === 'function') && args.pop(),
			putData = (typeof(args[args.length - 1]) === 'object') && args.pop(),
			domain_id = (typeof(args[args.length - 1]) === 'string') && args.pop();
		if (!putData) return cb({status: 'error', message: 'Must supply data envelope to edit specified domain'});
	    if (!domain_id) return cb({status: 'error', message: 'Invalid domain id given'});
	    var self = this;
	    self.client.put('dns', 'managed', domain_id, putData, function(err, data) {
		    if (err) return cb(err);
		    cb(null, data);
	    });
	},
	
	getRecordsForDomain: function() {
		var args = utils.getArgs(arguments),
			cb = (typeof(args[args.length - 1]) === 'function') && args.pop(),
			domain_id = (typeof(args[args.length - 1]) === 'string') && args.pop();
		
		if (!domain_id) return cb({status: 'error', message: 'Invalid domain id given'});
		var self = this;
		self.client.get('dns', 'managed', domain_id, 'records', function(err, data) {
			if (err) return cb(err);
			cb(null, data);
		});
	},
	
	deleteRecordsForDomain: function() {
		var args = utils.getArgs(arguments),
			cb = (typeof(args[args.length - 1]) === 'function') && args.pop(),
			domain_id = (typeof(args[args.length - 1]) === 'string') && args.pop();
			
		if (!domain_id) return cb({status: 'error', message: 'Invalid domain id given'});
		var self = this;
		self.client.delete('dns', 'managed', domain_id, 'records', function(err, data){
			if (err) return cb(err);
			cb(null, data);
		});
	},
	
	createRecordsForDomain: function() {
		var args = utils.getArgs(arguments),
			cb = (typeof(args[args.length - 1]) === 'function') && args.pop(),
			postData = (typeof(args[args.length - 1]) === 'object') && args.pop(),
			domain_id = (typeof(args[args.length - 1]) === 'string') && args.pop();
		if (!postData) return cb({status: 'error', message: 'Must supply data envelope to create domain'});
	    if (!domain_id) return cb({status: 'error', message: 'Invalid domain id given'});
	    var self = this;
	    self.client.post('dns', 'managed', domain_id, postData, function(err, data) {
		    if (err) return cb(err);
		    cb(null, data);
	    });
	}
	
};