const express = require('express');
const app = express.Router();
const datapool = require("./db").datapool;
const mappool = require("./db").mappool;
const qs = require("qs")
const axios = require("axios")
const crypto = require("crypto");
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './www/uploads/')
    },
    filename: function (req, file, cb) {
        // const ftype = file.mimetype.split("/");
        // console.log(ftype);
        const fname = req.body.d_id + ".zip"
        cb(null, fname);
    }
});

const upload = multer({ storage: storage, limits: { fieldSize: 25 * 1024 * 1024 } })

app.post('/ds-api/upload', upload.single('ufile'), (req, res) => {
    if (req.body.DT_RadioOptions == 'ข้อมูลภูมิสารสนเทศเชิงพื้นที่') {
        // console.log(req.file.filename);
        // const sql = `INSERT INTO filesource (d_id,d_fname)VALUES('${req.body.d_id}', '${req.file.filename}')`;
        // datapool.query(sql).then(() => {
        //     console.log("insert ok");
        // })

        const url = `http://flask:3100/shp2pgsql/${req.body.d_id}/${req.file.filename}`
        // console.log(url);
        axios.get(url).then(r => {
            console.log("insert ok");
        })
    }
    // console.log(req.file.filename, req.body.d_id)
})

let insertMember = (student_id, firstname_th, lastname_th, cmuitaccount, organization_code, organization_name, itaccounttype_th) => {
    let sql = `INSERT INTO formmember(student_id,firstname_th,lastname_th,cmuitaccount,organization_code,organization_name,itaccounttype_th, auth, dt)
    VALUES('${student_id}','${firstname_th}','${lastname_th}','${cmuitaccount}','${organization_code}','${organization_name}','${itaccounttype_th}', 'user',now())`
    datapool.query(sql).then(() => console.log("insert ok"))
}

let selectMemberOne = (profile) => {
    return new Promise((resolve, reject) => {
        let sql = `SELECT * FROM formmember WHERE cmuitaccount='${profile.cmuitaccount}'`;
        datapool.query(sql).then(r => {
            if (r.rows.length < 1) {
                insertMember(profile.student_id, profile.firstname_TH, profile.lastname_TH, profile.cmuitaccount, profile.organization_code, profile.organization_name_TH, profile.itaccounttype_TH);
                resolve("user");
            } else {
                if (r.rows[0].auth == "admin") {
                    resolve("admin");
                } else {
                    resolve("user");
                }
            }
        })
    })
}

const checkUser = (req, res, next) => {
    const { cmuitaccount } = req.body;
    console.log(cmuitaccount);
    const sql = `SELECT gid FROM formmember WHERE cmuitaccount='${cmuitaccount}' and auth='admin'`;
    datapool.query(sql, (e, r) => {
        if (r.rows.length > 0) {

            res.cmuitaccount = cmuitaccount;
            next()
        } else {
            console.log("not row");
        }
    })
}

const loginMiddleware = (req, res, next) => {
    const data = {
        code: req.body.code,
        redirect_uri: "https://open.engrids.soc.cmu.ac.th/login/index.html",
        client_id: "JDxvGSrJv9RbXrxGQAsj0x4wKtm3hedf2qw3Cr2s",
        client_secret: "U7cz62qhfR6vQw4nJaVpEyAq5JjG5EdzHaA2uEAU",
        grant_type: "authorization_code"
    };

    const url = "https://oauth.cmu.ac.th/v1/GetToken.aspx"
    const headers = { 'content-type': 'application/x-www-form-urlencoded' }

    axios.post(url, qs.stringify(data), headers).then((r) => {
        var config = {
            method: 'get',
            url: 'https://misapi.cmu.ac.th/cmuitaccount/v1/api/cmuitaccount/basicinfo',
            headers: {
                'Authorization': 'Bearer ' + r.data.access_token,
                'Cookie': 'BIGipServermisapi_pool=536964618.20480.0000'
            }
        };

        axios(config)
            .then((resp) => {
                const hsah = crypto.createHash('md5').update(`${resp.data.cmuitaccount}${Date.now()}`).digest("hex")
                selectMemberOne(resp.data).then(r => {
                    console.log(r);
                    req.status = {
                        token: hsah,
                        data: resp.data,
                        auth: r
                    }
                    next()
                });
            })
            .catch((error) => {
                req.status = "valid";
            });
    }).catch((error) => {
        req.status = "valid";
    })
}

app.post("/ds-chekauth/gettoken", loginMiddleware, (req, res) => {
    // console.log(req.status);
    res.status(200).json(req.status)
})

////formuser////
app.post('/fuser-api/userid', (req, res) => {
    const { username, password } = req.body
    datapool.query(`select id_user,username,form_limit,quset_limit,file_limit,img_limit from formuser where username = '${username}' and password = '${password}';`, (e, r) => {
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
    datapool.query(`select form_limit,quset_limit,ans_limit,file_limit,img_limit,map_limit from formuser where id_user = '${id_user}';`, (e, r) => {
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
    datapool.query(`SELECT * FROM datasource order by d_row desc;`, (e, r) => {
        res.status(200).json({
            data: r.rows
        })
    })
})

app.get('/ds-api/getdata', (req, res) => {
    // const { staid } = req.body
    const sql = `SELECT d_name,d_detail,d_groups,d_keywords,d_id,d_username,d_tnow,d_sd, d_meta as d_datafiles  
    FROM datasource WHERE d_access='publish' ORDER BY d_tnow desc;`
    datapool.query(sql, (e, r) => {
        res.status(200).json({
            data: r.rows
        })
    })
});

app.post('/ds-api/loaddata', (req, res) => {
    const { d_id } = req.body
    const sql = `SELECT d_name,d_detail,d_type,d_source,d_groups,d_keywords,d_id,d_username,d_tnow,d_sd, d_datafiles  
    FROM datasource WHERE d_id='${d_id}' ORDER BY d_tnow desc;`
    datapool.query(sql, (e, r) => {
        res.status(200).json({
            data: r.rows
        })
    })
});

app.post('/ds-api/loadgeojson', (req, res) => {
    const { d_id } = req.body
    const sql = `SELECT ST_SRID(geom) as geom FROM ${d_id}`;
    mappool.query(sql).then(re => {
        if (re.rows[0]) {
            if (re.rows[0].geom == "4326") {
                const sql = `SELECT ST_AsGeoJSON(ST_Simplify(geom, 0.008)) as geom FROM ${d_id}`;
                mappool.query(sql, (e, r) => {
                    res.status(200).json(r.rows)
                })
            } else {
                const sql = `SELECT ST_AsGeoJSON(ST_Transform(ST_Simplify(geom, 0.001), 4326)) as geom FROM ${d_id}`;
                mappool.query(sql, (e, r) => {
                    res.status(200).json(r.rows)
                })
            }
        }
    })
});

app.post('/ds-api/save', async (req, res) => {
    const { data } = req.body;
    const sql = `INSERT INTO datasource(d_id, d_tnow)VALUES('${data.d_id}', now());`
    // console.log(sql);
    await datapool.query(sql);
    let d;
    for (d in data) {
        if (data[d] !== '' && d !== 'd_id') {
            let sql = `UPDATE datasource SET ${d}='${data[d]}' WHERE d_id ='${data.d_id}'`;
            // console.log(sql);
            await datapool.query(sql)
        }
    }
    res.status(200).json({
        data: 'Save data'
    })
})

app.post('/ds-api/postdata', (req, res) => {
    let sql = `SELECT d_name,d_detail,d_groups,d_keywords,d_id,d_username,d_tnow,d_sd,d_meta as d_datafiles FROM datasource WHERE d_access='publish' order by d_tnow desc;`;
    datapool.query(sql, (e, r) => {
        res.status(200).json({
            data: r.rows
        })
    })
})

app.post('/ds-api/listdata', (req, res) => {
    const { d_iduser } = req.body;
    const sql = `select d_id,d_name,d_detail,d_access,d_tnow,d_sd from datasource where d_iduser='${d_iduser}' order by d_tnow desc;`
    datapool.query(sql, (e, r) => {
        res.status(200).json({
            data: r.rows
        })
    })
})

app.post('/ds-api/listmember', checkUser, (req, res) => {
    const sql = `SELECT d.d_row, d.d_name,d.d_detail, d.d_groups, d.d_keywords, 
                    d.d_id, d.d_username, d.d_tnow, d.d_sd, d.d_meta, d.d_tnow, d.d_access,
                    f.firstname_th, f.lastname_th, f.organization_name, auth
                FROM datasource d
                LEFT JOIN formmember f ON 
                    d.d_iduser = f.cmuitaccount`;

    datapool.query(sql).then(r => {
        res.status(200).json({
            data: r.rows
        })
    });
})

app.post('/ds-api/listuser', checkUser, (req, res) => {
    // const { cmuitaccou } = req.body
    const sql = `SELECT f.firstname_th, f.lastname_th, f.student_id, f.cmuitaccount, f.itaccounttype_th, f.organization_name, auth, dt, TO_CHAR(dt, 'DD-MM-YYYY') as dd FROM formmember f`;
    console.log(sql)
    datapool.query(sql).then(r => {
        res.status(200).json({
            data: r.rows
        })
    });
})

app.post('/ds-api/deleteuser', async (req, res) => {
    const { cmuitaccount } = req.body

    const sql = `DELETE FROM formmember WHERE cmuitaccount ='${cmuitaccount}'`;
    console.log(sql);
    await datapool.query(sql).then(r => {
        res.status(200).json({
            data: 'success'
        })
    })
})

app.post('/ds-api/deletedata', async (req, res) => {
    const { d_id } = req.body
    await datapool.query(`DELETE FROM datasource WHERE d_id ='${d_id}';`).then(r => {
        mappool.query(`DROP TABLE ${d_id}`);
        res.status(200).json({
            data: 'success'
        })
    })
})

app.post('/ds-api/setadmin', async (req, res) => {
    const { cmuitaccount } = req.body
    const sql = `UPDATE formmember SET auth = 'admin' WHERE cmuitaccount ='${cmuitaccount}';`
    console.log(sql)
    await datapool.query(sql).then(r => {
        // console.log(r.rows)
        res.status(200).json({
            data: 'success'
        })
    })
})

app.post('/ds-api/setuser', async (req, res) => {
    const { cmuitaccount, auth } = req.body
    const sql = `UPDATE formmember set auth = '${auth}' WHERE cmuitaccount ='${cmuitaccount}';`
    console.log(sql)
    await datapool.query(sql).then(r => {
        // console.log(r.rows)
        res.status(200).json({
            data: 'success'
        })
    })
})

app.post('/ds-api/editdata', (req, res) => {
    const { d_id } = req.body
    datapool.query(`SELECT * FROM datasource WHERE d_id='${d_id}';`, (e, r) => {
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
    datapool.query(`select * from datasource where d_id='${d_id}' and d_access ='publish';`, (e, r) => {
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
    await datapool.query(`UPDATE datasource SET d_tnow=now() WHERE d_id ='${data.d_id}';`)
    let d;
    for (d in data) {
        if (data[d] !== '' && d !== 'd_id') {
            let sql = `UPDATE datasource SET ${d}='${data[d]}' WHERE d_id ='${data.d_id}'`;
            // console.log(sql)
            await datapool.query(sql)
        }
    }
    res.status(200).json({
        data: 'Update data'
    })
})

app.post('/ds-api/access', async (req, res) => {
    const { d_id, d_access } = req.body
    if (d_id) {
        await datapool.query(`UPDATE datasource SET d_access='${d_access}' WHERE d_id ='${d_id}';
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
        await datapool.query(`SELECT d_sd from datasource WHERE d_id ='${d_id}';`).then(r => {
            var sd = Number(r.rows[0].d_sd) + 1
            datapool.query(`UPDATE datasource SET d_sd='${sd}' WHERE d_id ='${d_id}';`).then(r => {
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
    await datapool.query(`INSERT INTO datahitstory (id_user,username,dataid,dataname,datafile,d_tdate) 
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
        await datapool.query(`SELECT username,dataname,datafile,d_tdate FROM datahitstory ORDER BY Hrow DESC;`).then(r => {
            res.status(200).json({
                data: r.rows
            })
        })
    }
})

module.exports = app;