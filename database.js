const mysql = require('mysql');

var pool = mysql.createPool({
  connectionLimit: 10,
  host: '127.0.0.1',
  user: 'root',
  password: '1234',
  database: 'syscom'
});

exports.getConnection = function(callback) {
  pool.getConnection(function(err, connection) {
    if(err) 
      return callback(error);
       
    callback(err, connection);
  })
}

module.exports = pool;