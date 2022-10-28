const express = require('express');
const app = express.Router();
const con = require("./db");
const dataonline = con.dataonline;


app.post("/profile-api/chkuser", (req, res) => {
    const { username } = req.body;
    const sql = `SELECT count(gid) FROM regis_onlinedata WHERE username = '${username}'`
    dataonline.query(sql).then(r => {
        res.status(200).json({
            data: r.rows
        })
    })
})


app.get("/regis-api/save", async (req, res) => {
    const { data } = req.body;
    // let { userid, username } = req.body
    await dataonline.query(`INSERT INTO regis_onlinedata (id_user, username, password, fullname, studentid, email, major, faculty, ts_date)
    VALUES(${data.id_user},${data.username},${data.pass}, ${data.fullname}, ${data.studentid}, ${data.email}, ${data.major}, ${data.faculty},now())`)
    let d;
    for (d in data) {
        if (data[d] !== '') {
            let sql = `UPDATE regis_onlinedata SET ${d}='${data[d]}' WHERE id_user ='${data.id_user}'`;
            // console.log(sql);
            await dataonline.query(sql)
        }
    }
    res.status(200).json({
        data: "insert success"
    });
});


module.exports = app;