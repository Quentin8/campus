var express = require('express');
var router = express.Router();

const {rows} = require("pg/lib/defaults");

async function getValues(req, res, pgclient) {
    let result = {};
    result = await pgclient.query('Select id, nom, channel, valeur,\"raspberryId\" from \"Capteurs\" where type = \'led\'');
    res.json(JSON.stringify(result.rows));
}




module.exports = {getValues};
