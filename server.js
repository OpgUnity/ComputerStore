var cors = require('cors')

var express = require('express'),
    app = express(),
    port = process.env.PORT || 3002,
    bodyParser = require('body-parser');
;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var routes = require('./server/routes/routes');
routes(app);

app.listen(port);

console.log('todo list RESTful API server started on: ' + port);

