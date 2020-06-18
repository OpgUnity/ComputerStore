const cors = require('cors');

const express = require('express'),
    app = express(),
    port = process.env.PORT || 3002,
    bodyParser = require('body-parser');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const routes = require('./server/routes/routes');
routes(app);

app.listen(port);

console.log('todo list RESTful API server started on: http://localhost:' + port);

