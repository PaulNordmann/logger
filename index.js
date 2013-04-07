var connect = require('connect'),
	http = require('http'),
	loggerModule = require('./lib/logger'),
	options = require("./config/options"),
	user = require("./config/user");
	
var logger = new loggerModule(options.db);

function basicAuth(login, password) {
	return typeof user[login] !== 'undefined' && password === user[login];
}

function handlePath(req, res){
	return function(req, res){
		switch(req.url.split('?')[0]) {
			case '/getData' : logger.getData(req, res);break;
			default : res.end();
		}
	}
}


connect()
.use(connect.logger('dev'))
.use(connect.basicAuth(basicAuth))
.use(connect.static('public'))
.use(handlePath())
.listen(options.server.port);