function callSQL(){
  var mysql = require('mysql');
  var connection = mysql.createConnection({
      host: 'www.bearthecoder.tech',
      user: 'beartder_BearTheCoder',
      password: '^@.f{4P!&;B8',
  });

  connection.connect(function (err) {
    if (err) {
        console.error('error connecting: ' + err.stack);
      return;
    }
    console.log('connected as id ' + connection.threadId);
  });
}

module.exports = {callSQL};