const Pool = require('pg').Pool


const dataonline = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'cherry',
    password: '07054',
    port: 5432,
});


exports.dataonline = dataonline;

