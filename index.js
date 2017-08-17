const express = require('express')
const app = express()
const DatabaseAdapter = require('./backend/tableService.js');
const dbAdapter = new DatabaseAdapter();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

app.listen(2412, function () {
    console.log('Example app listening on port 2412!');
});

app.get('/tables', function (req, res) {
    dbAdapter.getTables().then(function (result) {
        res.send(result);
    });
});

app.get('/table', function (req, res) {
    dbAdapter.getTable(req.query.table).then(function (result) {
        res.send(result);
    });
});

app.post('/query', function (req, res) {
    dbAdapter.executeQuery(req.body).then(function (result) {
        res.send(result);
    });
});
