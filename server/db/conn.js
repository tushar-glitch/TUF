const { createPool } = require('mysql')
require('dotenv').config()

const pool = createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DB,
    connectionLimit:50
})
module.exports = pool