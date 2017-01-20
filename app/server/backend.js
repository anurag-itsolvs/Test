var process = require('process');
//for production use 'production', for development use 'development'
process.env.NODE_ENV = 'development';


var express = require('express');
var bodyparser = require('body-parser');
var request = require('request');

var app = express();
app.use(bodyparser.urlencoded({extended: true}));
app.use(bodyparser.json());

app.set('view engine', 'ejs');       //EJS template engine (no HTML for now)
app.use(express.static(__dirname + '/../../app'));

app.get('/*', function(req, res) {
    res.render(__dirname + '/../../app');
});

var port_no;
if('development' == app.get('env')){
    port_no = 7000;
}

if('production' == app.get('env')){
    port_no = 80;
}





var server = app.listen(port_no, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("Example app listening at http://%s:%s", host, port)
})

console.log('Server listening on port ' + server.address().port);

app.post('/getData', function (req, res) {

		console.log("Hiiiiii")
        var username = req.body.data;

        request({
            url: "http://localhost:9000/getData",
            method: "POST",
            json: true,
            body : username

        }, function(error, response, body) {


            console.log(body);
            res.send(body)


        })


    });