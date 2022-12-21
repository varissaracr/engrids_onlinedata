const Pool = require('pg').Pool

const datapool = new Pool({
    user: 'postgres',
    host: 'postgis',
    database: 'maindata',
    password: '1234',
    port: 5432,
});

exports.datapool = datapool;


