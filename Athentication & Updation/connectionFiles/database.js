var mysql=require('mysql');

//connecting with mysql
var connection = mysql.createConnection({
    host     : '',
    user     : '',
    password : '',
    database:""
  });
  
  connection.connect(function(err) {
    if (err) {
      console.error('error connecting: ' + err);
      return;
    }
    console.log('connected');
  });

module.exports=connection;