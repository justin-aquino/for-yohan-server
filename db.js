const Pool = require("pg").Pool //this is the postgres package we installed.

const pool = new Pool({
    user: "postgres",
    password: "chaeyoung29",
    host: "localhost",
    port: 8000,
    database: "flashcard"
})

module.exports = pool;