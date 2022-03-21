var express = require('express');
var router = express.Router();

const {rows} = require("pg/lib/defaults");

async function getValues(req, res, pgclient) {
    let result = {};
    result = await pgclient.query('Select valeur, id, type, channel, nom from \"Capteurs\" where (\"pieceId\" = 2) except Select valeur, id, type, channel, nom from \"Capteurs\" where (type = \'prise\') or (type = \'lampe\') or (type = \'bool\') order by id asc');
    res.json(JSON.stringify(result.rows));
}



module.exports = {getValues};
