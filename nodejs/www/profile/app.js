// sessionStorage.clear();

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

var code = getCookie("open_code");
var firstname_TH = getCookie("open_firstname_TH");
var firstname_THp = getCookie("open_firstname_TH");
var lastname_TH = getCookie("open_lastname_TH");
var student_id = getCookie("open_student_id");
var organization_name_TH = getCookie("open_organization_name_TH");
var cmuitaccount = getCookie("open_cmuitaccount");
var itaccounttype = getCookie("open_itaccounttype_th");
var auth = getCookie("open_auth");
var open_auth = getCookie("open_auth");

let adminview = sessionStorage.getItem("adminview");
if (adminview == "yes") {
    firstname_THp = sessionStorage.getItem("open_firstname_TH");
    lastname_TH = sessionStorage.getItem("open_lastname_TH");
    student_id = sessionStorage.getItem("open_student_id");
    organization_name_TH = sessionStorage.getItem("open_organization_name_TH");
    cmuitaccount = sessionStorage.getItem("open_cmuitaccount");
    itaccounttype = sessionStorage.getItem("open_itaccounttype_th");
    open_auth = sessionStorage.getItem("open_auth");
}

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
    document.cookie = "open_cmuitaccount=; max-age=0; path=/;";
    document.cookie = "open_itaccounttype_th=; max-age=0; path=/;";
    document.cookie = "open_auth=; max-age=0; path=/;";
    gotoIndex()
}

let gotoProfile = () => {
    location.href = "./../profile/index.html";
}

let gotoAdmin = () => {
    location.href = './../admin/index.html';
}

let gotoManage_user = () => {
    location.href = "./../manage_user/index.html";
}

let gotoManage = () => {
    location.href = "./../manage/index.html";
}

let gotoInput = () => {
    location.href = "./../input/index.html";
}

let gotoIndex = () => {
    location.href = "./../dashboard/index.html";
}

let loadData = () => {
    // document.getElementById("std_name").value = `${firstname_TH} ${lastname_TH}`;
    // document.getElementById("std_id").value = `${student_id}`;
    // document.getElementById("std_org").value = `${organization_name_TH}`;
    // document.getElementById("std_acc").value = `${cmuitaccount}`;
    // document.getElementById("std_acctype").value = `${itaccounttype}`;
    // document.getElementById("std_auth").value = `${open_auth}`;

    $('#firstname').text(firstname_THp)
    $('#lastname').text(lastname_TH)
    $('#std_id').text(student_id)
    $('#std_org').text(organization_name_TH)
    $('#std_acc').text(cmuitaccount)
    $('#std_acctype').text(itaccounttype)
    $('#std_auth').text(open_auth)
}



if (code) {
    $('#profile').html(`
    <li class="dropdown" > <a class="active" href="#" > <i class="bi bi-person-circle" style="font-size: 22px;"></i> <span class="ff-noto">&nbsp; ${firstname_TH}</span> <i class="bi bi-chevron-down"> </i> </a> 
        <ul>
            <li><a href="#" onclick="gotoProfile()"><span class="ff-noto">โปรไฟล์</span> </a></li>
            <li><a href="#" onclick="gotoInput()"><span class="ff-noto">เพิ่มข้อมูล</span></a></li>
            <li><a href="#" onclick="gotoManage()"><span class="ff-noto">การจัดการข้อมูล</span></a></li>
            <li><a href="#" onclick="gotoLogout()"><span class="ff-noto">ออกจากระบบ</span><i class="bi bi-door-closed" style="font-size: 18px;"></i></a></li>
        </ul>
    </li>`)
    if (auth == "admin") {
        $('#profile').html(`<li class="dropdown" > <a class="active" href="#" > <i class="bi bi-person-circle" style="font-size: 22px;"></i> <span class="ff-noto">&nbsp; ${firstname_TH}</span> <i class="bi bi-chevron-down"> </i> </a> 
            <ul>
                <li><a href="#" onclick="gotoProfile()"><span class="ff-noto">โปรไฟล์</span> </a></li>
                <li><a href="#" onclick="gotoInput()"><span class="ff-noto">เพิ่มข้อมูล</span></a></li>
                <li><a href="#" onclick="gotoManage()"><span class="ff-noto">การจัดการข้อมูล</span></a></li>
                <li><a href="#" onclick="gotoAdmin()"><span class="ff-noto">การจัดการผู้ใช้</span></a></li>
                <li><a href="#" onclick="gotoLogout()"><span class="ff-noto">ออกจากระบบ</span><i class="bi bi-door-closed" style="font-size: 18px;"></i></a></li>
            </ul>
        </li>`)
    }
    loadData();
} else {
    $('#profile').html(`<a href="#" onclick="gotoLogin()"><i class="bx bx-exit"></i><span class="ff-noto">เข้าสู่ระบบ</span></a>`);
    gotoLogin()
}

// AOS.init();
