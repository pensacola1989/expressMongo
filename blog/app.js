
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , Sequelize = require('sequelize')
  , path = require('path');

var app = express();

var sequelize = new Sequelize('test', 'root', '');

var Project = sequelize.define('Project',{
  title : Sequelize.STRING,
  description : Sequelize.TEXT
});

var Task = sequelize.define('Task',{
  title: Sequelize.STRING,
  description: Sequelize.TEXT,
  deadline: Sequelize.DATE
});

Project.sync();
Task.sync();

Project.drop();
Task.drop();

var project = Project.build({
  title: 'my awesome project',
  description: 'woo,fuckfuck', 
});

project
  .save()
  .success(function () {
    console.log('fuck suc');
  });

var task = Task.build({
  title: 'my awesome project',
  description: 'woo,fuckfuck', 
  deadline: new Date()
});

task
  .save()
  .success(function () {
    console.log('fuck suc too!');
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
