const { Pool } = require('pg');

const dbParams = {
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_NAME || 'final',
  user: process.env.DB_USER || 'vagrant',
  password: process.env.DB_PASS || '123'
}

const db = new Pool(dbParams);

db.connect(() => {
  console.log("Connected to database");
})

module.exports = db;