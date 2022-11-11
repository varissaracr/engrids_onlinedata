// let val1
// let val2
// console.log(val1, val2)

// const urlapi = `https://engrids.soc.cmu.ac.th/api/ds-api`
// const urlapi = `http://localhost:3000/ds-api`

let getCookie = (cname) => {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

const code = getCookie("open_code");
const firstname_TH = getCookie("open_firstname_TH");
const lastname_TH = getCookie("open_lastname_TH");
const student_id = getCookie("open_student_id");
const organization_name_TH = getCookie("open_organization_name_TH");

let refreshPage = () => {
    location.reload(true);
}

let gotoLogin = () => {
    let url = 'https://oauth.cmu.ac.th/v1/Authorize.aspx?response_type=code' +
        '&client_id=JDxvGSrJv9RbXrxGQAsj0x4wKtm3hedf2qw3Cr2s' +
        '&redirect_uri=https://open.engrids.soc.cmu.ac.th/login/' +
        '&scope=cmuitaccount.basicinfo' +
        '&state=profile'
    window.location.href = url;
}

let gotoLogout = () => {
    document.cookie = "open_code=; max-age=0; path=/;";
    document.cookie = "open_firstname_TH=; max-age=0; path=/;";
    document.cookie = "open_lastname_TH=; max-age=0; path=/;";
    document.cookie = "open_student_id=; max-age=0; path=/;";
    document.cookie = "open_organization_name_TH=; max-age=0; path=/;";
    gotoIndex()
}

let gotoProfile = () => {
    location.href = "./../profile/index.html";
}

let gotoManage = () => {
    location.href = "./../manage/index.html";
}

let gotoIndex = () => {
    location.href = "./index.html";
}

let loadData = () => {
    document.getElementById("std_name").value = `${firstname_TH} ${lastname_TH}`
    document.getElementById("std_id").value = `${student_id}`
    document.getElementById("std_org").value = `${organization_name_TH}`
}

if (code) {
    $('#profile').html(`
    <li class=" dropdown" > <a class="active" href="#" > <i class="bx bxs-user-detail"></i> <span class="ff-noto">${firstname_TH}</span> <i class="bi bi-chevron-down"> </i> </a> 
        <ul>
            <li><a href="#" onclick="gotoProfile()"><span class="ff-noto">โปรไฟล์</span> </a></li>
            <li><a href="#" onclick="gotoManage()"><span class="ff-noto">การจัดการข้อมูล</span></a></li>
        </ul>
    </li>`)
    $('#login').html(`<a href="#" onclick="gotoLogout()"><i class="bx bx-log-out"></i><span class="ff-noto">ออกจากระบบ</span></a>`)
    loadData()
} else {
    $('#login').html(`<a href="#" onclick="gotoLogin()"><i class="bx bx-exit"></i><span class="ff-noto">เข้าสู่ระบบ</span></a>`);
    loadData()
}


// AOS.init();
