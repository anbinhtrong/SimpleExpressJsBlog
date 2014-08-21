(function(){
		/**
	 * Module dependencies.
	 */

	var express = require('express');
	var routes = require('./routes');
	var user = require('./routes/user');
	var http = require('http');
	var path = require('path');
	var app = express();
	var ECT = require('ect');	

	application_start();
	registerRoute();
	// development only
	if ('development' == app.get('env')) {
	  app.use(express.errorHandler());
	}

	

	http.createServer(app).listen(app.get('port'), function(){
	  console.log('Express server listening on port ' + app.get('port'));
	});

	//setup port, views path, view engine
	function application_start(){		
		var ectRenderer = ECT({ watch: true, root: __dirname + '/views' });
		app.engine('.ect', ectRenderer.render);
		// all environments
		app.set('port', process.env.PORT || 1000);
		//app.set('views', path.join(__dirname, 'views'));
		//app.set('view engine', 'jade');
		app.use(express.compress());
		app.use(express.favicon());
		app.use(express.logger('dev'));
		app.use(express.json());
		app.use(express.urlencoded());
		app.use(express.methodOverride());
        app.use(process.env.appvirtdir || '', app.router);//app.use(app.router);
		app.use(require('stylus').middleware(path.join(__dirname, 'public')));
		app.use(express.static(path.join(__dirname, 'public')));
		app.use(function(req, res){
		    	res.status(404).render('error404.ect', {url: req.url});
	    });
	}

	function registerRoute(){
		app.get('/', routes.index);
		app.get('/users', user.list);
		app.get('/displayForm', routes.displayForm);
		app.post('/postForm', routes.postForm);
	}

})();
