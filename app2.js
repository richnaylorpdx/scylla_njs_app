const cassandra = require('cassandra-driver');
const client = new cassandra.Client({ contactPoints: ['172.17.0.2'], localDataCenter: 'datacenter1', keyspace: 'tracking' });

const query = 'SELECT name, email FROM users WHERE key = ?';
const query2 = 'select * from tracking_data';
client.execute(query)
  .then(result => console.log('User with email %s', result));