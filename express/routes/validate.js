var express = require('express');
var router = express.Router();

const {rows} = require("pg/lib/defaults");

async function getValues(req, res, pgclient) {
    let result = {};
    result = await pgclient.query('Select username, password, autorisation,empreinte, nom from \"Utilisateurs\";');
    res.json(JSON.stringify(result.rows));
}



module.exports = {getValues};
