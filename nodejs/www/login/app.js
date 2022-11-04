

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const code = urlParams.get('code')

if (code) {
    console.log(code);
    axios.post('/ds_chekauth/gettoken', { code }).then(r => console.log(r))
}


// POST /v1/GetToken.aspx HTTP/1.1
// Host: oauth.cmu.ac.th
// content-type: application/x-www-form-urlencoded

// code=63153448415548317175
// &redirect_uri=https://yourclientapp.com/callback
// &client_id=7J5H7qzHYC7UA3GhYzywyuwcY9wjxgA77yu9bPBb
// &client_secret=JvgfjEACUvh2hrnXujZsEAPbkBxnKYV3a2J4u28j
// &grant_type=authorization_code

