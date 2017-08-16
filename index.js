const express = require('express')
const app = express()
const DatabaseAdapter = require('./backend/tableService.js');
const dbAdapter = new DatabaseAdapter();

app.listen(2412, function () {
    console.log('Example app listening on port 2412!');
});

app.get('/tables', function (req, res) {
    dbAdapter.query('SHOW TABLES', function (result) {
        res.send(result);
    });
});
