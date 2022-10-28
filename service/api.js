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

app.post('/ds-api/save', async (req, res) => {
    const { data } = req.body;
    // console.log(data)
    await dataonline.query(`INSERT INTO datasource(d_id)VALUES('${data.d_id}');`)
    await dataonline.query(`UPDATE datasource SET d_tnow=now() WHERE d_id ='${data.d_id}';`)
    let d;
    for (d in data) {
        if (data[d] !== '' && d !== 'd_id') {
            let sql = `UPDATE datasource SET ${d}='${data[d]}' WHERE d_id ='${data.d_id}'`;
            // console.log(sql)
            await dataonline.query(sql)
        }
    }
    res.status(200).json({
        data: 'Save data'
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

// app.post("/profile-api/resetmail", async (req, res) => {
//     const { email } = req.body;

//     let sql = `SELECT email from register WHERE email='${email}'`;
//     await eec.query(sql).then(async (r) => {
//         console.log(r.rows.length);

//         if (r.rows.length > 0) {
//             let newpass = Date.now()
//             await eec.query(`UPDATE register SET pass='${newpass}' WHERE email='${email}'`);

//             const accessToken = await oAuth2Client.getAccessToken()
//             const transporter = nodemailer.createTransport({
//                 service: 'gmail',
//                 auth: {
//                     type: 'OAuth2',
//                     user: 'eec.onep@gmail.com',
//                     clientId: CLIENT_ID,
//                     clientSecret: CLIENT_SECRET,
//                     refreshToken: REFRESH_TOKEN,
//                     accessToken: accessToken
//                 }
//             })

//             const mailOptions = {
//                 from: 'eec.onep@gmail.com',
//                 to: email,
//                 subject: "รหัสผ่านใหม่",
//                 // text: 'hello test aaaa',
//                 html: `รหัสผ่านใหม่ของท่านคือ  <b>${newpass}</b> 
//                 <br>เข้าสู่ระบบอีกครั้งที่ https://eec-onep.online/form_register/login/index.html 
//                 <br>เมื่อเข้าสู้ระบบได้แล้วกรุณาเปลี่ยนรหัสผ่านใหม่`
//             }

//             await transporter.sendMail(mailOptions, function (error, info) {
//                 if (error) {
//                     console.log(error);
//                 } else {
//                     // console.log('Email sent: ' + info.response);
//                     res.status(200).json({
//                         data: `ส่งรหัสผ่านใหม่ไปยัง ${email} เรียบร้อยแล้ว`
//                     })
//                 }
//             });
//         } else {
//             res.status(200).json({
//                 data: `${email} ยังไม่ได้ลงทะเบียน <br>กรุณาลงทะเบียนก่อนใช้งาน`
//             })
//         }
//     })

// })

module.exports = app;