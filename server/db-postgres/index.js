const { Pool } = require('pg');
const pool = new Pool({
  database: 'about'
});

module.exports = pool;
