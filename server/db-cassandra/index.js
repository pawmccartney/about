const cassandra = require('cassandra-driver');
const client = new cassandra.Client({
  contactPoints: ['127.0.0.1', '127.0.0.2', '127.0.0.3'],
  localDataCenter: 'datacenter1',
  keyspace: 'about'
});

client.connect();

module.exports = client;
