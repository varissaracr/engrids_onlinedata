

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const code = urlParams.get('code')

const state = urlParams.get('state')


let setCookie = (cvalue, gid, auth, usrname, exdays) => {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires=" + d.toUTCString();
    document.cookie = "open_ustoken=" + cvalue + ";" + expires + ";path=/";
    document.cookie = "open_gid=" + gid + ";" + expires + ";path=/";
    document.cookie = "open_auth=" + auth + ";" + expires + ";path=/";
    document.cookie = "open_usrname=" + usrname + ";" + expires + ";path=/";
}

if (code) {
    axios.post('/ds_chekauth/gettoken', { code }).then(r => {
        // setCookie(r.data.data, r.data.gid, r.data.auth, r.data.usrname, 1)
        console.log(r.data.data);
        // window.location.replace("./../" + state);
    })
}



// POST /v1/GetToken.aspx HTTP/1.1
// Host: oauth.cmu.ac.th
// content-type: application/x-www-form-urlencoded

// code=63153448415548317175
// &redirect_uri=https://yourclientapp.com/callback
// &client_id=7J5H7qzHYC7UA3GhYzywyuwcY9wjxgA77yu9bPBb
// &client_secret=JvgfjEACUvh2hrnXujZsEAPbkBxnKYV3a2J4u28j
// &grant_type=authorization_code

