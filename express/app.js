const mqtt = require('mqtt')
const host = '10.3.141.1'
const port = '1883'
const clientId = 'appliWeb'
const connectUrl = `mqtt://${host}:${port}`
//const connectUrl = `mqtt://test.mosquitto.org:1883`
const mqttClient = mqtt.connect(connectUrl, {
    clientId,
    clean: true,
    connectTimeout: 4000,
    username: 'admin',
    password: 'raspadmin22',
    reconnectPeriod: 1000,
})

const {Client} = require('pg');

var createError = require('http-errors');
var express = require('express');
var cors = require('cors');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const bodyParser = require('body-parser')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var lampes = require('./routes/lampes');
var prises = require('./routes/prises');
var patientOne = require('./routes/patientOne');
var patientTwo = require('./routes/patientTwo');
var operation = require('./routes/operation');
var reserve = require('./routes/reserve');


var app = express();
app.use(cors());


const client = new Client({
    host : "localhost",
    user : "postgres",
    port : 5432,
    password : "Isen44N",
    database : "campusConnecteFinal"
});

client.connect();

var corsOptions = {
    origin: 'http://localhost:4200',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.get('/api/lampes', cors(corsOptions), (req, res) => {
  console.log("call lampes");
  lampes.getValues(req, res, client);
});

app.get('/api/prises', cors(corsOptions), (req, res) => {
    console.log("call prises");
    prises.getValues(req, res, client);
});

app.get('/api/patientOne', cors(corsOptions), (req, res) => {
    console.log("call vitals patient 1");
    patientOne.getValues(req, res, client);
});

app.get('/api/patientTwo', cors(corsOptions), (req, res) => {
    console.log("call vitals patient 2");
    patientTwo.getValues(req, res, client);
});

app.get('/api/operation', cors(corsOptions), (req, res) => {
    console.log("call prises");
    operation.getValues(req, res, client);
});

app.get('/api/reserve', cors(corsOptions), (req, res) => {
    console.log("call prises");
    reserve.getValues(req, res, client);
});


// Middleware
app.use(express.json());

app.post('/api/lampes',  (req, res) => {
        //res.render('index', { title: 'Express' });
        console.log("call write");
        console.log(req.body);
        console.log(req.body.id);
        console.log(req.body.valeur);

        mqttClient.publish('hopital/0',`${req.body.channel},${req.body.valeur}`, {qos:2, retain: false}, (error)=>{
            if (error){
                console.log(error)
            }
        });

        client.query('UPDATE \"Capteurs\" SET valeur = $1 WHERE id = $2 ;', [req.body.valeur, req.body.id], (err, res) => {
                    if (err) {
                        console.log('there was an error');
                        console.log('SELECT pool.query():', err);
                    }

                    if (res) {
                        console.log('It works');
                        console.log('SELECT pool.query():', res);
                    }
                });
        //mqtt

        res.json('good');
    }

    //const lampe = req
);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
