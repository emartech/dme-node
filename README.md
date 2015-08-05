## dme2-node
### A node module for DNSMadeEasy's V2.0 API

### To use

- Import the module

		var dme = require('dme2');

- Setup config

		var config = {
			apikey: <INSERT_APIKEY>,
			secret: <INSERT_APISECRET>,
			debug: false
		};

- Create client

		var client = dme.createClient(config);


- Access ManagedDNS

		var mgdns = new dnsmadeeasy.ManagedDNS(client);
		mgdns.getAllDomains(function(err, data){
			if (err) console.log(err);
			var domains = data.data;
			domains.forEach(function(domain){
				mgdns.getDomain(domain.id, function(err, data){
					if (err) console.log(err);
					console.log(data);
				});
			});
		});

### Working submodules
- ManagedDNS
- SOA
- Template
- VanityDNS
- AccountACL
- Failover
- Folder
- IPSet
- QueryUsage
- SecondayDNS

### Notes
All api calls require a callback that exposes the error (if any) and the data
ex.

	function(err, data)

To know exactly what parameters to pass in the data envelope, consult the DNSMadeEasy API V2.0 Documentation by going [here](http://www.dnsmadeeasy.com/wp-content/uploads/2012/09/API-Documentationv2.pdf)

### Todo
- Provide significantly better documentation
- Provide better comments in the code itself

### License
GPL
