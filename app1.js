var cassandra = require('cassandra-driver');

var insertData = function (first_name, last_name, timestamp, heat, location, speed, telepathy_powers, date) {
    var client = new cassandra.Client({
        contactPoints: ['some-scylla'],
        keyspace: 'tracking'
    });

    var query = 'INSERT INTO tracking_data (first_name,last_name,timestamp,heat,location,speed,telepathy_powers) VALUES (?,?,?,?,?,?,?);';
    const parms = [first_name, last_name, timestamp, heat, location, speed, telepathy_powers];
    client.execute(query, parms, {
        prepare: true
    }, function (err, result) {
        if (err) {
            console.log('\n' + err);
        }
    });
};
// create table tracking_data (
//     first_name text,
//     last_name text,
//     timestamp text,
//     heat text,
//     location text,
//     speed text,
//     telepathy_powers text,
//     PRIMARY KEY((first_name, last_name)));

//   create table tracking_data (
//     first_name text,
//     last_name text,
//     timestamp text,
//     heat text,
//     location text,
//     speed text,
//     telepathy_powers text,
//     PRIMARY KEY((first_name, last_name)));

// insert into tracking_data ("first_name","last_name","heat","location","speed","telepathy_powers","timestamp") values ('cruz','naylor','yes','lake o','fast','yes','12345');

function load() {
    setTimeout(function() {
      var first_name = 'Jim';
      var last_name = 'Jeffries';
      var location = 'New York';
      var get_year = new Date();
      var speed = Math.round(Math.random() * (100 - 1) + 1);
      var heat = Math.round(Math.random() * (50 - 1) + 1);
      var telepathy_powers = Math.round(Math.random() * (50 - 1) + 1);
      var year = get_year.getFullYear();
      var hour = Math.round(Math.random() * (23 - 1) + 1);
      var minute = Math.round(Math.random() * (59 - 1) + 1);
      var day = Math.round(Math.random() * (30 - 1) + 1);
      var month = Math.round(Math.random() * (12 - 1) + 1);
      var timestamp = year + '-' + month + '-' + day + ' ' + hour + ':' + minute + '+0000';
      insertData(first_name, last_name, timestamp, heat, location, speed, telepathy_powers);
      load();
    }, 50);
  }
  
  load();