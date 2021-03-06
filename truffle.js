module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  networks: {
  	development: {
  		host: 			"localhost",
  		port: 			7545,
  		network_id: "*",
			gas:        4712388,
			gasPrice:   100000000000
		},
  	production: {
  		host: 			"localhost",
  		port: 			7545,
  		network_id: "*",
			gas:        4712388,
			gasPrice:   100000000000
  	}
  }
};
