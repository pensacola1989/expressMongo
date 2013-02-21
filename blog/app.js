
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , mongoose = require('mongoose')
  , path = require('path');

var app = express();

mongoose.connect('mongodb://localhost/fuck');
var db = mongoose.connection;
db.on('error',console.error.bind(console,'connection error:'));
db.once('open',function callback () {
  console.log('fuck');
});

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use('/css', express.static(__dirname + '/public/stylesheets'));
  app.use('/js', express.static(__dirname + '/public/javascripts'));
  app.use('/images', express.static(__dirname + '/public/images'));
  
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', routes.index);
app.get('/users', user.list);
app.get('/test',function (req,res) {
    
});

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
