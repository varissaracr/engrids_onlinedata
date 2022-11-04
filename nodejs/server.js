const express = require('express')
const app = express()
const port = 3000

// app.get('/', (req, res) => {
//     res.send('Hello World!')
// })

app.use('/', express.static('www'))

app.listen(port, () => {
    console.log(`http://localhost:${port}`)
})

const datapull = require('./service/datapull');
app.use(datapull);

