const Pool = require('pg').Pool
const pool = new Pool({
  user: 'user',
  host: 'localhost',
  database: 'Dormy_db',
  password: 'password',
  port: 5432,
})

module.exports = {
  pool
}