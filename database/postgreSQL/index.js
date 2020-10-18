const { Pool } = require('pg');

const pool = new Pool({
  user: 'paulchoi',
  host: 'localhost',
  database: 'timcamp',
  port: 5432,
})

module.exports = pool;
