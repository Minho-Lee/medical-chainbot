'use strict';

let fs = require('fs');
let express = require('express');
let app = express();
let bodyParser = require('body-parser');
var cfenv = require('cfenv');

var mongoose = require('mongoose');

var models = require('./models/patient.js');
var Patient = models.patientModel;

mongoose.connect('mongodb://sssaini1:sssaini1@ds231725.mlab.com:31725/medical-chain');

app.use(bodyParser.urlencoded({
	extended: false
}));
app.use(bodyParser.json());

app.use(express.static(__dirname + '/public'));

app.use(function(req,res,next) {
	// res.header('Access-Control-Allow-Origin', "x-requested-with");
	// res.header("Access-Control-Allow-Headers", "*");
	next();
})

app.engine('html', require('ejs').renderFile);
// app.set('view engine', 'html');

app.get('/', function(req, res) {
	res.render('main.ejs');
});

app.get('/patient', function(req, res) {
	res.render('patient.ejs')
})

app.post('/patient-info', function(req, res) {
console.log("the patient I am looking for in the db: "+ req.body.name);

	 Patient.find({"name":req.body.name},function (err, doc) {
	 	console.log(doc);
	 	console.log(err);
         res.render('patient-info.ejs', {
                doc: doc
            });
    });



});

app.get('/doctor', function(req, res) {
	res.render('doctor.ejs');
});

app.get('/pharmacist', function(req, res) {
	res.render('pharmacist.ejs');
})

var appEnv = cfenv.getAppEnv();
// console.log(appEnv);
// start server on the specified port and binding host
app.listen(appEnv.port, '0.0.0.0', function() {
	// print a message when the server starts listening
	console.log("server starting on " + appEnv.url);
});
