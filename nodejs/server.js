const express = require('express')
const app = express()
const port = 3000

const bodyParser = require('body-parser');
const cors = require('cors');

app.use(cors());
app.options('*', cors());

app.use(bodyParser.json({
    limit: '50mb',
    extended: true
}));

app.use(bodyParser.urlencoded({
    limit: '50mb',
    extended: true
}));

app.use('/', express.static('www'))

app.listen(port, () => {
    console.log(`http://localhost:${port}`)
})

const datapull = require('./service/datapull');
app.use(datapull);


const requestTime = function (req, res, next) {
    req.reqTime = Date.now()
    next()
}



