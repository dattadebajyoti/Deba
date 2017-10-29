var express = require('express'),
app = express(),
port = process.env.PORT || 3000,
mongoose = require('mongoose'),
Task = require('./api/tasks/models/todoListModel'), //created model loading here
bodyParser = require('body-parser');

// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/Tododb');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var taskRoutes = require('./api/tasks/routes/taskRoutes'); //importing route
taskRoutes(app); //register the route

var userRoutes = require('./api/users/routes/userRoutes'); //importing route
app.use('/users', userRoutes);//register the route

/**
 * Having done all these, what happens if we entered a wrong route? say you entered
 * 'http://localhost:3000/task', It responds with a message “Cannot GET /task”.
 * Let’s add express middleware which could be used to return more interactive messages.
 *
 * Middlewares basically intercepts incoming http request and as such you can use them
 * to perform several operations ranging from authentication to validations etc.
 */

app.use(function(req, res) {
    res.status(404).send({url: req.originalUrl + ' not found'})
});


app.listen(port);

console.log('todo list RESTful API server started on: ' + port);
