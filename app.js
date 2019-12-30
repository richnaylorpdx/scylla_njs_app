const express = require('express')
var cassandra = require('cassandra-driver');
const app = express();
const port = 3000;

app.get('/', (req, res) => res.send('Hello World!'));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
var insertData = function (first_name, last_name, address, picture_location) {
    // var client = new cassandra.Client({
    //     contactPoints: ['scylla-node1', 'scylla-node2', 'scylla-node3'],
    //     keyspace: 'tracking'
    // });
    var client = new cassandra.Client({
        // contactPoints: ['127.0.0.1'],
        contactPoints: ['172.17.0.2'],
        // contactPoints: ['scylla'],
        keyspace: 'catalog'
    });

    // var query = 'INSERT INTO tracking_data (first_name,last_name,timestamp,heat,location,speed,telepathy_powers) VALUES (?,?,?,?,?,?,?);';
    var query = 'INSERT INTO mutant_data (first_name,last_name,address,picture_location) VALUES (?,?,?,?,?,?,?);';
    var query2 = 'insert into mutant_data (first_name,last_name,address,picture_location) VALUES (Bob,Zemuda,1202 Coffman Lane, http://www.facebook.com/bzemuda);';
    const parms = [first_name, last_name, address, picture_location];
    client.execute(query2, parms, {
        prepare: true
    }, function (err, result) {
        if (err) {
            console.log('\n' + err);
        }
    });
};

function load() {
    setTimeout(function () {
        var first_name = 'Jim';
        var last_name = 'Jeffries';
        var address = 'New York';
        var picture_location = 'http://www.facebook.com/jim'
        // var get_year = new Date();
        // var speed = Math.round(Math.random() * (100 - 1) + 1);
        // var heat = Math.round(Math.random() * (50 - 1) + 1);
        // var telepathy_powers = Math.round(Math.random() * (50 - 1) + 1);
        // var year = get_year.getFullYear();
        // var hour = Math.round(Math.random() * (23 - 1) + 1);
        // var minute = Math.round(Math.random() * (59 - 1) + 1);
        // var day = Math.round(Math.random() * (30 - 1) + 1);
        // var month = Math.round(Math.random() * (12 - 1) + 1);
        // var timestamp = year + '-' + month + '-' + day + ' ' + hour + ':' + minute + '+0000';
        insertData(first_name, last_name, address, picture_location);
        load();
    }, 50);
}

load();
