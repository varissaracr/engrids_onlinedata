const Pool = require('pg').Pool


const datapull = new Pool({
    user: 'postgres',
    host: '172.16.0.2',
    database: 'end_form',
    password: 'Eec-MIS2564db',
    port: 5432,
});

exports.datapull = datapull;


