var express = require('express');
var bodyparser = require('body-parser');
var busboy = require('connect-busboy');
var process = require('process');
//for production use 'production', for development use 'development'
process.env.NODE_ENV = 'development';



var app = express();
app.use(bodyparser.urlencoded({extended: true}));
app.use(bodyparser.json());
app.use(busboy());
app.all('/*', function (request, response, next) {
	      response.header('Access-Control-Allow-Origin', '*')
          response.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
          response.header('Content-Type', 'application/json')
          response.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
     
        next();
    });


var port_no;
if('development' == app.get('env')){
    port_no = 9000;
}

if('production' == app.get('env')){
    port_no = 80;
}

var environment = app.get('env');


var server = app.listen(port_no, function() {
  console.log('Server listening on port ' + server.address().port);
});



app.post("/getData",function(req,res){-
        getUserData(req,res);
});

function getUserData(req,res) {
  console.log(req.body)
  res.send( "Hello "+req.body.name)
}
