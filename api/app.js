var express = require('express');
var mysql     =    require('mysql');
var bodyparser = require('body-parser');
var busboy = require('connect-busboy');
var process = require('process');
var db_config = require('./config/db_config.json');
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

var host_name = '';
var database_name = '';
var user_name = '';
var password = '';

 // check environment
    if ('development' == app.get('env')) {
      	console.log("inside development")
      	port_no = 9000;

        host_name = db_config.development.host_name;
        database_name = db_config.development.database_name;
        user_name = db_config.development.user_name;
        password = db_config.development.password;

    }

    if ('production' == app.get('env')) {
      console.log("inside production")
      	port_no = 80;

        host_name = db_config.production.host_name;
        database_name = db_config.production.database_name;
        user_name = db_config.production.user_name;
        password = db_config.production.password;
    }

var environment = app.get('env');


var server = app.listen(port_no, function() {
  console.log('Server listening on port ' + server.address().port);
});



app.post("/insertData",function(req,res){
        insertUserData(req,res);
});

app.get("/getUsers",function(req,res){
	console.log("aaaaaaaa")
        getData(req,res);
});


var pool      =    mysql.createPool({
    connectionLimit : 100, //important
    host: host_name,
    database: database_name,
	user: user_name,
	password: password
	
});

function getData(req,res) {
    
    pool.getConnection(function(err,connection){
        if (err) {
        	console.log(err)
          res.json({"code" : 100, "status" : "Error in connection database"});
          return;
        }  
        	

      		var sql = "SELECT * from tbl_users ";

	         connection.query(sql,function(err,result){
	            connection.destroy();
	            if (err) {
	               res.send({status: false, message : 'Error! Please try again.'});
	            } else {
	            	console.log(result)
	                res.send({status: true, message: result});
	            }          
	        });
	     
      	
  });
}

function insertUserData(req,res) {
    
    pool.getConnection(function(err,connection){
        if (err) {
        	console.log(err)
          res.json({"code" : 100, "status" : "Error in connection database"});
          return;
        }  

        var sql = {};
      	if(req.body.name == '' || req.body.name == undefined){

      		console.log(" blank" + req.body.name)
      		res.send({status: false, message :'User Name is Required!!'});
      		return;
      	}else{
      		console.log("Not blank" + req.body.name)
      		sql.user_name = req.body.name;
      	} 

      	insertUserData(sql);

        function insertUserData(sql){

	          connection.query('insert into tbl_users set ?', sql,function(err,result){
	            
	            if (err) {
	               connection.destroy();
	               res.send({status: false, message : 'Error! Please try again.'});
	            } else {

	                getUserData(result);
	            }          
	        });
	     }

      	function getUserData(result){

      		var userId = result.insertId;

      		var sql = "SELECT * from tbl_users "+
	     		   	  "where tbl_users.user_pid = "+ connection.escape(userId) +" " ;

	         connection.query(sql,function(err,result){
	            connection.destroy();
	            if (err) {
	               res.send({status: false, message : 'Error! Please try again.'});
	            } else {

	                res.send({status: true, message: result});
	            }          
	        });
	     }
      	
  });
}