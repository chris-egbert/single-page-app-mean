var appConfig = require('./server/config/app.js');
var express = require('express');
var app = express();
var session = require('express-session');
var mongoose = require('mongoose');
var logger = require('morgan');
var session = require('express-session');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

// Database
mongoose.connect(appConfig.db.url); // connect to mongoDB database

// Express HTML view parser - Nunjucks
// nunjucks.configure('views', {
//     autoescape: true,
//     express: app
// });


// settings

// set our default template engine to "jade"
// which prevents the need for extensions
app.set('view engine', 'jade');

// set views for error and 404 pages
app.set('views', __dirname + '/server/views');

// define a custom res.message() method
// which stores messages in the session
app.response.message = function(msg){
  // reference 'req.session' via the 'this.req' reference
  var sess = this.req.session;
  // simply add the msg to an array for later
  sess.messages = sess.messages || [];
  sess.messages.push(msg);
  return this;
};

// Log
if (!module.parent) app.use(logger('dev'));

// Set the static files location /public/img will be /img for users
app.use(express.static(__dirname + '/public'));
app.use('/bower_components',  express.static(__dirname + '/bower_components'));

// Support Google SEO crawling
app.use(require('prerender-node'));

// session support
app.use(session({
  resave: false, // don't save session if unmodified
  saveUninitialized: false, // don't create session until something stored
  secret: appConfig.session_secret
}));

// Parse application/x-www-form-urlencoded (req.body)
app.use(bodyParser.urlencoded({'extended':'true'})); 

// Parse JSON
app.use(bodyParser.json()); // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json

// Allow overriding methods in query (?_method=put)
app.use(methodOverride('_method')); 

// expose the "messages" local variable when views are rendered
app.use(function(req, res, next){
  var msgs = req.session.messages || [];

  // expose "messages" local variable
  res.locals.messages = msgs;

  // expose "hasMessages"
  res.locals.hasMessages = !! msgs.length;

  next();
  // empty or "flush" the messages so they
  // don't build up
  req.session.messages = [];
});

// Load / Init Controllers
require('./server/controller-init.js')(app, { verbose: !module.parent });

app.use(function(err, req, res, next){
  // log it
  if (!module.parent) console.error(err.stack);

  // error page
  res.status(500).render('5xx');
});

// assume 404 since no middleware responded
app.use(function(req, res, next){
  res.status(404).render('404', { url: req.originalUrl });
});

/* istanbul ignore next */
if (!module.parent) {
  app.listen(appConfig.listen_port);
  console.log('Express started on port ' + appConfig.listen_port);
}



