const Pool = require("pg").Pool //this is the postgres package we installed.

const pool = new Pool({
    user: "akinojuno",
    password: "chaeyoung29",
    host: "localhost",
    port: 5432, //postgres by default runs on this port
    database: "flashcard"
})

module.exports = pool;