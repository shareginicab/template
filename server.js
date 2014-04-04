var express, http, path, reload, cars, app,
    clientDir, server;

// import modules.
express = require('express');
http = require('http');
path = require('path');

app = express();

// keep a reference to the dev directory path.
clientDir = path.join(__dirname, 'application/development');

// express configuration.
app.configure(function() {
    app.set('port', process.env.PORT || 3000);
    app.use(express.logger('dev'));
    app.use(express.bodyParser());
    app.use(app.router);
    app.use(express.static(clientDir));
});

app.configure('development', function() {
    app.use(express.errorHandler());
});

/* Routing Start */

// Home page.
app.get('/', function(req, res) {
    res.sendfile(path.join(clientDir, 'index.html'));
});

/* Routing End */

// initialize node server.
server = http.createServer(app);
server.listen(app.get('port'), function() {
    console.log("Web server listening on port " + app.get('port'));
});