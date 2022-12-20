sessionStorage.clear()

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
const auth = getCookie("open_auth");

let refreshPage = () => {
    location.reload(true);
}

let gotoLogin = () => {
    let url = 'https://oauth.cmu.ac.th/v1/Authorize.aspx?response_type=code' +
        '&client_id=JDxvGSrJv9RbXrxGQAsj0x4wKtm3hedf2qw3Cr2s' +
        '&redirect_uri=http://localhost/login/index.html' +
        '&scope=cmuitaccount.basicinfo' +
        '&state=dashboard'
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
    window.open('./../admin/index.html');
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

const loginPopup = () => {
    let url = 'https://oauth.cmu.ac.th/v1/Authorize.aspx?response_type=code' +
        '&client_id=JDxvGSrJv9RbXrxGQAsj0x4wKtm3hedf2qw3Cr2s' +
        '&redirect_uri=http://localhost/login/index.html' +
        '&scope=cmuitaccount.basicinfo' +
        '&state=dashboard'
    window.location.href = url;
};

let gotoIndex = () => {
    location.href = "./index.html";
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
} else {
    $('#profile').html(`<a href="#" onclick="gotoLogin()"><i class="bx bx-exit"></i><span class="ff-noto">เข้าสู่ระบบ</span></a>`);
}

$(window).on('load', function () {
    if ($('#preloader').length) {
        $('#preloader').delay(100).fadeOut('slow', function () {
            $(this).remove();
        });
    }
});


let gotodata = (txt) => {
    location.href = './../infordata/index.html?page=1&category=' + txt;
}

let numcategory = async (d) => {
    console.log(d)
    let politics = 0;
    let nature = 0;
    let agri = 0;
    let stat = 0;
    let energy = 0;
    let science = 0;
    let religion = 0;
    let logistics = 0;
    let society = 0;
    let urban = 0;
    let economy = 0;
    let study = 0;
    let health = 0;
    let travel = 0;

    await d.map(i => {
        i == "การเมืองและการปกครอง" ? politics += 1 : null;
        i == "ทรัพยากรธรรมชาติและสิ่งแวดล้อม" ? nature += 1 : null;
        i == "เกษตกรรมและการเกษตร" ? agri += 1 : null;
        i == "สถิติทางการ" ? stat += 1 : null;
        i == "โครงสร้างพื้นฐานระบบและพลังงาน" ? energy += 1 : null;
        i == "วิทยาศาสตร์เทคโนโลยีดิจิทัลและนวัตกรรม" ? science += 1 : null;
        i == "ศาสนาศิลปและวัฒนธรรม" ? religion += 1 : null;
        i == "การคมนาคมและโลจิตจิกส์" ? logistics += 1 : null;
        i == "สังคมและสวัสดิการ" ? society += 1 : null;
        i == "เมืองและภูมิภาค" ? urban += 1 : null;
        i == "เศรษฐกิจการเงินและอุตสาหกรรม" ? economy += 1 : null;
        i == "การศึกษา" ? study += 1 : null;
        i == "สาธาณสุขและสุขภาพ" ? health += 1 : null;
        i == "การท่องเที่ยว" ? travel += 1 : null;
        i == "" ? length += 1 : null;
    })

    // console.log(nature)
    $('#all').text(d.length)
    $('#politics').text(politics)
    $('#nature').text(nature)
    $('#agri').text(agri)
    $('#stat').text(stat)
    $('#energy').text(energy)
    $('#science').text(science)
    $('#religion').text(religion)
    $('#logistics').text(logistics)
    $('#society').text(society)
    $('#urban').text(urban)
    $('#economy').text(economy)
    $('#study').text(study)
    $('#health').text(health)
    $('#travel').text(travel)
}

let valCategorys = []
let load_data = () => {
    axios.get('/ds-api/getdata').then(r => {
        console.log(r);
        var data = r.data.data;

        var arr = [];
        var category = [];

        data.map(i => {
            arr.push(i)
            var group = JSON.parse(i.d_groups)
            group.map(e => category.push(e))
        })
        numcategory(category)
    })
}

let gotodownload = (d_id) => {
    sessionStorage.setItem('d_id', d_id);
    window.location.href = `./../detail/index.html?d_id=${d_id}`;

}
// $('#login').click(function () { loginPopup() })

const datauser = {}

let gotomanage = (d_id) => {
    if (Object.values(datauser).length !== 0 || val1 || val2) {
        var name = datauser.username
        var id = datauser.userid
        sessionStorage.setItem('value1', name ? name : val1);
        sessionStorage.setItem('value2', id ? id : val2);
        // window.open('./manage/index.html', '_blank');
        window.location.href = './../manage/index.html';
    } else {
        loginPopup()
    }

}

let gotoinput = (d_id) => {
    if (Object.values(datauser).length !== 0 || val1 || val2) {
        var name = datauser.username
        var id = datauser.userid
        sessionStorage.setItem('value1', name ? name : val1);
        sessionStorage.setItem('value2', id ? id : val2);
        window.location.href = './../input/index.html';
    } else {
        loginPopup()
    }

}

$('.mobile-nav-toggle').on('click', function (e) {
    var content;
    if (code && auth == 'admin') {
        content = `
        <div class="d-flex flex-column " id="memu_mobile">
        <a class="btn-memu" href="./../dashboard/index.html"><i class="bi bi-house-door"></i> <span>หน้าหลัก</span></a>
        <a class="btn-memu" href="./../infordata/index.html"><i class="bi bi-box"></i> <span>ฐานข้อมูลสารสนเทศ</span></a>
        <a class="btn-memu" href="#" onclick="gotoProfile()"><i class="bx bxs-user-detail"></i><span class="ff-noto">${firstname_TH}</span></a>
        <a class="btn-memu" href="./../input/index.html"><i class="bi bi-file-earmark-arrow-up"></i> <span>นำเข้าข้อมูล</span> </a>
        <a class="btn-memu" href="./../manage/index.html"><i class="bi bi-tools"></i> <span>จัดการข้อมูล</span> </a>
        <a class="btn-memu" href="#" onclick="gotoLogout()"><i class="bx bx-log-out"></i><span class="ff-noto">ออกจากระบบ</span></a>
        <a class="btn-memu" href="https://engrids.soc.cmu.ac.th/" disabled><i class="bi bi-phone"></i><span>ติดต่อเรา</span></a>
      </div>`
    } else if (code) {
        content = `
        <div class="d-flex flex-column " id="memu_mobile">
        <a class="btn-memu" href="./../dashboard/index.html"><i class="bi bi-house-door"></i> หน้าหลัก </a>
        <a class="btn-memu" href="./../infordata/index.html"><i class="bi bi-box"></i> ฐานข้อมูลสารสนเทศ </a>
        <a class="btn-memu" href="#" onclick="gotoProfile()"><i class="bx bxs-user-detail"></i> ${firstname_TH} </a>
        <a class="btn-memu" href="#" onclick="gotoLogout()"><i class="bx bx-log-out"></i> ออกจากระบบ </a>
        <a class="btn-memu" href="https://engrids.soc.cmu.ac.th/" disabled><i class="bi bi-phone"></i> ติดต่อเรา </a>
      </div>`
    } else {
        content = `
        <div class="d-flex flex-column " id="memu_mobile">
        <a class="btn-memu" href="./../dashboard/index.html"><i class="bi bi-house-door"></i> หน้าหลัก </a>
        <a class="btn-memu" href="./../infordata/index.html"><i class="bi bi-box"></i> ฐานข้อมูลสารสนเทศ</a>
        <a class="btn-memu" href="#" onclick="gotoLogin()"><i class="bx bx-exit"></i> เข้าสู่ระบบ </a>
        <a class="btn-memu" href="https://engrids.soc.cmu.ac.th/" disabled><i class="bi bi-phone"></i>ติดต่อเรา</a>
      </div>`
    }
    Swal.fire({
        title: '<h3><span class="ff-noto"><b>เมนู</b></span></h3>',
        // icon: 'info',
        html: content + '',
        confirmButtonText: 'ปิด',
        confirmButtonColor: '#000000',
        // background: '#50d49f',
        customClass: {
            container: 'ff-noto',
            title: 'ff-noto',
        },
        // showConfirmButton: false,
        // showCloseButton: false,
        // showCancelButton: true,
    })
})

AOS.init();

$(document).ready(function () {
    load_data()
})
