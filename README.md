## dme-sdk
### A node module for DNSMadeEasy's V2.0 API

### To use

- Import the module

```javascript
var dme = require('dme-sdk');
```

- Setup config

```javascript
var config = {
	apikey: <INSERT_APIKEY>,
	secret: <INSERT_APISECRET>,
	debug: false
};
```

- Create client

```javascript
var client = dme.createClient(config);
```

- Access ManagedDNS

```javascript
var mgdns = dme.ManagedDNS.createManagedDNS(client);
mgdns.getAllDomains()
	.then(function(data) {
		console.log(data);
	})
	.catch(function(err) {
		console.log(err);
	});
```

- Access Usage

```javascript
var usage = dme.Usage.create(client);
usage.getUsage()
	.then(function(data) {
		console.log(data);
	})
	.catch(function(err) {
		console.log(err);
	});
```

### Working submodules

#### ManagedDNS

* `getDomain(domainId)`
* `createDomain(payload)`
* `updateDomain(domainId, payload)`
* `deleteDomain(domainId)`
* `deleteDomain(domainId)`
* `getAllDomains()`
* `updateMultipleDomains(payload)`
* `deleteMultipleDomains(payload)`
* `createRecordForDomain(domainId, payload)`
* `updateRecordForDomain(domainId, recordId, payload)`
* `deleteRecordForDomain(domainId, recordId)`
* `getRecordsForDomain(domainId)`
* `createRecordsForDomain(domainId, payload)`
* `updateRecordsForDomain(domainId, payload)`

#### Usage

* `getUsage()`
