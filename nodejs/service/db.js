const Pool = require('pg').Pool

const datapool = new Pool({
    user: 'postgres',
    host: 'postgis',
    database: 'maindb',
    password: '1234',
    port: 5432,
});

const mappool = new Pool({
    user: 'postgres',
    host: 'postgis',
    database: 'geodb',
    password: '1234',
    port: 5432,
});

exports.datapool = datapool;
exports.mappool = mappool;


