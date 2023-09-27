const Pool = require('pg').Pool;

const pool = new Pool({
    user: 'acer',
    database: 'new_blog',
    password: 'kuuhaku42',
    port: 5432,
    host: 'localhost'
});

module.exports = pool;