const express = require('express');
const app = express.Router();
const con = require("./db");
const datapull = con.datapull;

////formuser////
app.post('/fuser-api/userid', (req, res) => {
    const { username, password } = req.body
    datapull.query(`select id_user,username,form_limit,quset_limit,file_limit,img_limit from formuser where username = '${username}' and password = '${password}';`, (e, r) => {
        if (r.rows.length == 0) {
            res.status(200).json({
                data: 'false'
            })
        } else {
            res.status(200).json({
                data: r.rows
            })
        }
    })
})
app.post('/fuser-api/userid/option', (req, res) => {
    const { id_user } = req.body
    datapull.query(`select form_limit,quset_limit,ans_limit,file_limit,img_limit,map_limit from formuser where id_user = '${id_user}';`, (e, r) => {
        if (r.rows.length == 0) {
            res.status(200).json({
                data: 'false'
            })
        } else {
            res.status(200).json({
                data: r.rows
            })
        }
    })
})

////datasource////
app.get('/ds-api/get', (req, res) => {
    // const { staid } = req.body
    datapull.query(`SELECT * FROM datasource order by d_row desc;`, (e, r) => {
        res.status(200).json({
            data: r.rows
        })
    })
})
app.get('/ds-api/getdata', (req, res) => {
    // const { staid } = req.body
    datapull.query(`SELECT d_name,d_detail,d_groups,d_keywords,d_id,d_username,d_tnow,d_sd,d_datafiles  FROM datasource where d_access='publish' order by d_tnow desc;`, (e, r) => {
        res.status(200).json({
            data: r.rows
        })
    })
})
app.post('/ds-api/save', async (req, res) => {
    const { data } = req.body;
    // console.log(data)
    await datapull.query(`INSERT INTO datasource(d_id)VALUES('${data.d_id}');`)
    await datapull.query(`UPDATE datasource SET d_tnow=now() WHERE d_id ='${data.d_id}';`)
    let d;
    for (d in data) {
        if (data[d] !== '' && d !== 'd_id') {
            let sql = `UPDATE datasource SET ${d}='${data[d]}' WHERE d_id ='${data.d_id}'`;
            // console.log(sql)
            await datapull.query(sql)
        }
    }
    res.status(200).json({
        data: 'Save data'
    })

})
app.post('/ds-api/listdata', (req, res) => {
    const { d_iduser } = req.body
    if (d_iduser !== 'administrator') {
        datapull.query(`select d_name,d_id,d_access,d_tnow,d_sd from datasource where d_iduser='${d_iduser}' order by d_tnow desc;`, (e, r) => {
            res.status(200).json({
                data: r.rows
            })
        })
    } else {
        datapull.query(`select d_name,d_id,d_access,d_tnow,d_sd from datasource order by d_tnow desc;`, (e, r) => {
            res.status(200).json({
                data: r.rows
            })
        })
    }
})
app.post('/ds-api/editdata', (req, res) => {
    const { d_id } = req.body
    datapull.query(`select * from datasource where d_id='${d_id}';`, (e, r) => {
        if (r.rows.length == 0) {
            res.status(200).json({
                data: 'false'
            })
        } else {
            res.status(200).json({
                data: r.rows
            })
        }
    })
})
app.post('/ds-api/loaddata', (req, res) => {
    const { d_id } = req.body
    datapull.query(`select * from datasource where d_id='${d_id}';`, (e, r) => {
        if (r.rows.length == 0) {
            res.status(200).json({
                data: 'false'
            })
        } else {
            res.status(200).json({
                data: r.rows
            })
        }
    })
})
app.post('/ds-api/checkdata', (req, res) => {
    const { d_id } = req.body
    datapull.query(`select * from datasource where d_id='${d_id}' and d_access ='publish';`, (e, r) => {
        if (r.rows.length == 0) {
            res.status(200).json({
                data: 'false'
            })
        } else {
            res.status(200).json({
                data: r.rows
            })
        }
    })
})
app.post('/ds-api/update', async (req, res) => {
    const { data } = req.body
    await datapull.query(`UPDATE datasource SET d_tnow=now() WHERE d_id ='${data.d_id}';`)
    let d;
    for (d in data) {
        if (data[d] !== '' && d !== 'd_id') {
            let sql = `UPDATE datasource SET ${d}='${data[d]}' WHERE d_id ='${data.d_id}'`;
            // console.log(sql)
            await datapull.query(sql)
        }
    }
    res.status(200).json({
        data: 'Update data'
    })
})
app.post('/ds-api/deletedata', async (req, res) => {
    const { d_id } = req.body
    await datapull.query(`DELETE FROM datasource WHERE d_id ='${d_id}';`).then(r => {
        // console.log(r.rows)
        res.status(200).json({
            data: 'success'
        })
    })
})
app.post('/ds-api/access', async (req, res) => {
    const { d_id, d_access } = req.body
    if (d_id) {
        await datapull.query(`UPDATE datasource SET d_access='${d_access}' WHERE d_id ='${d_id}';
            UPDATE datasource SET d_tpublish=now() WHERE d_id ='${d_id}';`).then(r => {
            // console.log(r.rows)
            res.status(200).json({
                data: 'access'
            })
        })
    }
})
app.post('/ds-api/sd', async (req, res) => {
    const { d_id } = req.body
    if (d_id) {
        await datapull.query(`SELECT d_sd from datasource WHERE d_id ='${d_id}';`).then(r => {
            var sd = Number(r.rows[0].d_sd) + 1
            datapull.query(`UPDATE datasource SET d_sd='${sd}' WHERE d_id ='${d_id}';`).then(r => {
                res.status(200).json({
                    data: 'success'
                })
            })
        })
    }
})

////datahitstory////
app.post('/ds-api/hitstory', async (req, res) => {
    const { data } = req.body;
    // console.log(data)
    await datapull.query(`INSERT INTO datahitstory (id_user,username,dataid,dataname,datafile,d_tdate) 
    VALUES('${data.id_user}','${data.username}','${data.dataid}','${data.dataname}','${data.datafile}','${data.d_tdate}');`).then(r => {
        res.status(200).json({
            data: 'hitstory'
        })
    })
})
app.post('/ds-api/hitstory/getdata', async (req, res) => {
    const { id_user } = req.body;
    // console.log(data)
    if (id_user == 'admin') {
        await datapull.query(`SELECT username,dataname,datafile,d_tdate FROM datahitstory ORDER BY Hrow DESC;`).then(r => {
            res.status(200).json({
                data: r.rows
            })
        })
    }
})
module.exports = app;