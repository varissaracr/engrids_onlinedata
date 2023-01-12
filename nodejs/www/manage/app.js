sessionStorage.clear();

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
const cmuitaccount = getCookie("open_cmuitaccount");
const organization_name_TH = getCookie("open_organization_name_TH");
const auth = getCookie("open_auth");

let refreshPage = () => {
    location.reload(true);
}

let gotoLogin = () => {
    let url = 'https://oauth.cmu.ac.th/v1/Authorize.aspx?response_type=code' +
        '&client_id=JDxvGSrJv9RbXrxGQAsj0x4wKtm3hedf2qw3Cr2s' +
        '&redirect_uri=https://open.engrids.soc.cmu.ac.th/login/index.html' +
        '&scope=cmuitaccount.basicinfo' +
        '&state=manage'
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

const loginPopup = () => {
    let url = 'https://oauth.cmu.ac.th/v1/Authorize.aspx?response_type=code' +
        '&client_id=JDxvGSrJv9RbXrxGQAsj0x4wKtm3hedf2qw3Cr2s' +
        // '&redirect_uri=http://localhost/login/' +
        '&redirect_uri=https://open.engrids.soc.cmu.ac.th/login/index.html' +
        '&scope=cmuitaccount.basicinfo' +
        '&state=manage'
    window.location.href = url;
};

let gotoProfile = () => {
    location.href = "./../profile/index.html";
}

let gotoAdmin = () => {
    location.href = './../admin/index.html';
}

let gotoManage = () => {
    location.href = "./../manage/index.html";
}

let gotoInput = () => {
    location.href = "./../input/index.html";
}

let gotoIndex = () => {
    location.href = "./index.html";
}

let AddData = () => {
    window.location.href = './../input/index.html';
}

let editData = (d_id) => {
    sessionStorage.setItem('d_id', d_id);
    window.location.href = './../edit/index.html';
}

let gotodownload = (d_id) => {
    sessionStorage.setItem('d_id', d_id);
    window.open('./../detail/index.html', '_blank');
}

if (code) {
    $('#profile').html(`
    <li class="dropdown" > <a class="active" href="#" > <i class="bi bi-person-circle" style="font-size: 22px;"></i> <span class="font-noto">&nbsp; ${firstname_TH}</span> <i class="bi bi-chevron-down"> </i> </a> 
        <ul>
            <li><a href="#" onclick="gotoProfile()"><span class="font-noto">โปรไฟล์</span> </a></li>
            <li><a href="#" onclick="gotoInput()"><span class="font-noto">เพิ่มข้อมูล</span></a></li>
            <li><a href="#" onclick="gotoManage()"><span class="font-noto">การจัดการข้อมูล</span></a></li>
            <li><a href="#" onclick="gotoLogout()"><span class="font-noto">ออกจากระบบ</span><i class="bi bi-door-closed" style="font-size: 18px;"></i></a></li>
        </ul>
    </li>`)
    if (auth == "admin") {
        $('#profile').html(`<li class="dropdown" > <a class="active" href="#" > <i class="bi bi-person-circle" style="font-size: 22px;"></i> <span class="font-noto">&nbsp; ${firstname_TH}</span> <i class="bi bi-chevron-down"> </i> </a> 
            <ul>
                <li><a href="#" onclick="gotoProfile()"><span class="font-noto">โปรไฟล์</span> </a></li>
                <li><a href="#" onclick="gotoInput()"><span class="font-noto">เพิ่มข้อมูล</span></a></li>
                <li><a href="#" onclick="gotoManage()"><span class="font-noto">การจัดการข้อมูล</span></a></li>
                <li><a href="#" onclick="gotoAdmin()"><span class="font-noto">การจัดการผู้ใช้</span></a></li>
                <li><a href="#" onclick="gotoLogout()"><span class="font-noto">ออกจากระบบ</span><i class="bi bi-door-closed" style="font-size: 18px;"></i></a></li>
            </ul>
        </li>`)
    }
} else {
    $('#profile').html(`<a href="#" onclick="gotoLogin()"><i class="bx bx-exit"></i><span class="font-noto">เข้าสู่ระบบ</span></a>`);
    gotoLogin()
}

let dtable;
let id;

$.extend(true, $.fn.dataTable.defaults, {
    "language": {
        "sProcessing": "กำลังดำเนินการ...",
        "sLengthMenu": "แสดง_MENU_ แถว",
        "sZeroRecords": "ไม่พบข้อมูล",
        "sInfo": "แสดง _START_ ถึง _END_ จาก _TOTAL_ แถว",
        "sInfoEmpty": "แสดง 0 ถึง 0 จาก 0 แถว",
        "sInfoFiltered": "(กรองข้อมูล _MAX_ ทุกแถว)",
        "sInfoPostFix": "",
        "sSearch": "ค้นหา:",
        "sUrl": "",
        "oPaginate": {
            "sFirst": "เริ่มต้น",
            "sPrevious": "ก่อนหน้า",
            "sNext": "ถัดไป",
            "sLast": "สุดท้าย"
        },
        "emptyTable": "ไม่พบข้อมูล..."
    }
});
dtable = $('#TableData').DataTable({
    ajax: {
        async: true,
        type: "post",
        url: '/ds-api/listdata',
        data: { d_iduser: cmuitaccount },
        dataSrc: 'data'
    },
    columns: [
        { data: null, title: "ลำดับ", width: '50px' },
        {
            data: 'd_tnow', render: function (data, type, row, meta) {
                var t = new Date(row.d_tnow).toISOString().split('T')
                var date = new Date(t).toLocaleDateString('th-TH')
                return date
            }
        },
        { data: 'd_name' },
        { data: 'd_detail' },
        { data: 'd_type' },
        { data: 'd_access' },
        { data: 'd_sd' },
        {
            data: null, title: "จัดการข้อมูล",
            render: function (data, type, row, meta) {
                return `
                    <button class="btn btn-margin font-Noto" style="background-color: #60d1be; color: #ffffff;" onclick="accessDate('${row.d_id}','${row.d_name}')">การเข้าถึง</button>
                    <button class="btn btn-margin font-Noto" style="background-color: #84C7F2; color: #ffffff;" onclick="editData('${row.d_id}')">แก้ไขข้อมูล</button>
                    <button class="btn btn-margin font-Noto" style="background-color: #c41411; color: #ffffff;" onclick="deleteData('${row.d_id}','${row.d_type}')">ลบข้อมูล</button>`
            },
        },
    ],
    scrollX: true,
    // columnDefs: [
    //     { className: 'text-center', targets: [0, 1, 3, 4] },
    // ],

});

dtable.on('order.dt search.dt', function () {
    dtable.column(0, { search: 'applied', order: 'applied' }).nodes().each(function (cell, i) {
        cell.innerHTML = i + 1;
    });
}).draw();
// dtable.columns.adjust().draw();

let deleteData = (d_id, d_type) => {
    axios.post(`/ds-api/deletedata`, { d_id, d_type }).then(r => {
        var Sucss = r.data.data;
        if (Sucss == 'success') {
            Swal.fire({
                icon: 'success',
                title: 'ลบข้อมูลสำเร็จ',
                text: 'ข้อมูลของคุณถูกลบสำเร็จ',
                customClass: {
                    container: 'font-noto',
                    title: 'font-noto',
                },
            }).then((result) => {
                if (result.isConfirmed) {
                    dtable.ajax.reload();
                    // window.location.reload()
                }

            })
        }
    })
}

let accessDate = (id, name) => {
    Swal.fire({
        title: 'กำหนดสิทธิ์ในการเข้าถึงข้อมูล',
        // input: 'select',
        // inputOptions: {
        //     'private': 'Private',
        //     'publish': 'Publish',
        //     'grapes': 'Grapes',
        //     'Others': 'Others'
        // },
        html:
            `<select class="form-select" aria-label="Default select example" id="access">
                <option hidden>เลือก...</option>
                <option value="private">private</option>
                <option value="publish">publish</option>
            </select>
            <button class="l-check  mt-4" onclick="gotodownload('${id}')">ตรวจสอบข้อมูล</button>
            `,
        customClass: {
            container: 'font-noto',
            title: 'font-noto',
        },
        confirmButtonText: 'ยืนยัน',
        confirmButtonColor: '#60d1be',
        cancelButtonText: 'ปิด',
        cancelButtonColor: '#000000',
        showCancelButton: true,
        preConfirm: (value) => {
            const access = Swal.getPopup().querySelector('#access').value
            return { access: access }
        }
    }).then((result) => {
        if (result.value) {
            var data = {
                d_id: id,
                d_access: result.value.access
            }

            axios.post("/ds-api/access", data).then(r => {
                // console.log(r.data.data)
                if (r.data.data == 'access') {
                    Swal.fire({
                        icon: 'success',
                        title: 'เปลี่ยนสถานะเป็น ' + result.value.access + ' สำเร็จ',
                        confirmButtonText: 'ปิด',
                        confirmButtonColor: '#000000',
                        customClass: {
                            container: 'font-noto',
                            title: 'font-noto',
                        },
                    })
                    dtable.ajax.reload();
                }
            })
        }
    })
}

let getdata = () => {
    axios.get('/ds-api/getdata').then(r => {
        var data = r.data.data;
        // console.log(data);
    })
}

getdata()


$('.mobile-nav-toggle').on('click', function (e) {
    var content;
    if (code && auth == 'admin') {
        content = `
        <div class="d-flex flex-column " id="memu_mobile">
        <a class="btn-memu" href="./../dashboard/index.html"><i class="bi bi-house-door"></i> หน้าหลัก </a>
        <a class="btn-memu" href="./../infordata/index.html"><i class="bi bi-box"></i> ฐานข้อมูลสารสนเทศ </a>
        <div class="cd-accordion__item cd-accordion__item--has-children">
            <input class="cd-accordion__input" type="checkbox" name="group-1" id="group-1">
                <label class="cd-accordion__label cd-accordion__label--icon-folder btn-memu" for="group-1"><a class=""><i class="bi bi-person-circle" style="font-size: 22px;"></i> ${firstname_TH} </a></label>
                    <ul class="cd-accordion__sub cd-accordion__sub--l2">
                        <a class="btn-memu" href="#" onclick="gotoProfile()"><i class="bx bxs-user-detail"></i> โปรไฟล์</a>
                        <a class="btn-memu" href="./../input/index.html"><i class="bi bi-file-earmark-arrow-up"></i> นำเข้าข้อมูล </a>
                        <a class="btn-memu" href="./../manage/index.html"><i class="bi bi-pencil-square"></i> จัดการข้อมูล </a>
                        <a class="btn-memu" href="./../admin/index.html"><i class="bi bi-person-square"></i> จัดการผู้ใช้ </a>
                    </ul>
        </div>
        </div>
        <a class="btn-memu" href="#" onclick="gotoLogout()"><i class="bx bx-log-out"></i> ออกจากระบบ </a>
        <a class="btn-memu" href="https://engrids.soc.cmu.ac.th/" disabled><i class="bi bi-phone"></i> ติดต่อเรา </a>
      </div>`
    } else if (code) {
        content = `
        <div class="d-flex flex-column " id="memu_mobile">
        <a class="btn-memu" href="./../dashboard/index.html"><i class="bi bi-house-door"></i> หน้าหลัก </a>
        <a class="btn-memu" href="./../infordata/index.html"><i class="bi bi-box"></i> ฐานข้อมูลสารสนเทศ </a>
        <div class="cd-accordion__item cd-accordion__item--has-children">
        <input class="cd-accordion__input" type="checkbox" name="group-1" id="group-1">
            <label class="cd-accordion__label cd-accordion__label--icon-folder btn-memu" for="group-1"><a class=""><i class="bi bi-person-circle" style="font-size: 22px;"></i> ${firstname_TH} </a></label>
                <ul class="cd-accordion__sub cd-accordion__sub--l2">
                    <a class="btn-memu" href="#" onclick="gotoProfile()"><i class="bx bxs-user-detail"></i> โปรไฟล์</a>
                    <a class="btn-memu" href="./../input/index.html"><i class="bi bi-file-earmark-arrow-up"></i> นำเข้าข้อมูล </a>
                    <a class="btn-memu" href="./../manage/index.html"><i class="bi bi-pencil-square"></i> จัดการข้อมูล </a>
                </ul>
    </div>
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
        title: '<h3><span class="font-noto"><b>เมนู</b></span></h3>',
        // icon: 'info',
        html: content + '',
        confirmButtonText: 'ปิด',
        confirmButtonColor: '#000000',
        // background: '#50d49f',
        customClass: {
            container: 'font-noto',
            title: 'font-noto',
        },
        // showConfirmButton: false,
        // showCloseButton: false,
        // showCancelButton: true,
    })
})


