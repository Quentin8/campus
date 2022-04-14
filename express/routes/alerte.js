var express = require('express');
var router = express.Router();

const {rows} = require("pg/lib/defaults");

async function getValues(req, res, pgclient) {
    let result = {};
    result = await pgclient.query('Select * from \"Alerte\"');
    res.json(JSON.stringify(result.rows));
}




module.exports = {getValues};
