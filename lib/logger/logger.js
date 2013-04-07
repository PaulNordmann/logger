var mongodb = require ('mongodb');

var logger = function() {
	var instance = this;
	var options = arguments[0] || {};
	options.host = options.host || "localhost";
	options.port = options.port || 27017;
	options.db = options.db || 'test';
	options.collection = options.collection || 'testLog'; 

	var server = new mongodb.Server(options.host, options.port, {})
	
	function dbOpen(error, client) {
		if (error) throw error;
		instance.collection = new mongodb.Collection(client, options.collection);	
	}
	
	new mongodb.Db(options.db,server,{w:1})
	.open(dbOpen);
}

logger.prototype.getData = function(res, req) {
	
	var regExMsg = [
		/^\[.*\]/
	];
	var selector = {
		msg : {$in : regExMsg}
	};
	
	function analyseData(err, data) {
		console.log(data.length);
		req.end(JSON.stringify(data));
	}
	
	// var callback = arguments[0];
	this.collection.find(selector)
	// .limit(100)
	.toArray(analyseData);	
}

module.exports = logger;
