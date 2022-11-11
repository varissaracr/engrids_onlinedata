// var val1
// var val2

var val1 = localStorage.getItem('value1');
var val2 = localStorage.getItem('value2');

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

const id_data = localStorage.getItem('id_data');
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
        '&redirect_uri=http://localhost/login/' +
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
    gotoIndex()
}

const loginPopup = () => {
    let url = 'https://oauth.cmu.ac.th/v1/Authorize.aspx?response_type=code' +
        '&client_id=JDxvGSrJv9RbXrxGQAsj0x4wKtm3hedf2qw3Cr2s' +
        '&redirect_uri=http://localhost/login/' +
        '&scope=cmuitaccount.basicinfo' +
        '&state=manage'
    window.location.href = url;
};

let gotoIndex = () => {
    location.href = "./index.html";
}

if (code) {
    $('#profile').html(`
    <li class=" dropdown" > <a class="active" href="#" onclick="gotoProfile()"> <i class="bx bxs-user-detail"></i> <span class="font-noto">${firstname_TH}</span> <i class="bi bi-chevron-down"> </i> </a> 
    <ul>
    <li><a href="#"><span class="font-noto">โปรไฟล์</span> </a></li>
    <li><a href="./../manage/index.html"><span class="font-noto">การจัดการข้อมูล</span></a></li>
    </ul>
    </li>`)
    $('#login').html(`<a href="#" onclick="gotoLogout()"><i class="bx bx-log-out"></i><span class="font-noto">ออกจากระบบ</span></a>`)

} else {
    $('#login').html(`<a href="#" onclick="gotoLogin()"><i class="bx bx-exit"></i><span class="font-noto">เข้าสู่ระบบ</span></a>`);
    // gotoLogin();

}

$(document).ready(function () {
    // console.log(val2)
    if (code) {
        $('#username').text(val1)
        loadlistdata(val2)
        if (val2 == 'admin') {
            HistoryData(val2)
        }
    } else {
        Swal.fire({
            title: 'ไม่สามารถเข้าสู่ระบบได้!',
            text: 'กรุณาเข้าสู่ระบบใหม่อีกครั้งให้ถูกต้อง',
            icon: 'error',
            // iconColor: ''
            confirmButtonText: 'ปิด',
            // footer: '<a href=""><b>เข้าสู้ระบบ</b></a>',
            customClass: {
                container: 'font-noto',
                title: 'font-noto',
                confirmButton: 'btn btn-secondary',
            },
            allowOutsideClick: false,
            allowEscapeKey: false,
            preConfirm: async () => {
                window.location.href = "./../dashboard/index.html"
            }
        })
    }
})
let dtable
let loadlistdata = (id, tool) => {
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
            data: { d_iduser: id == 'admin' ? 'administrator' : id },
            dataSrc: 'data'
        },

        columns: [
            { data: null, title: "No.", width: '50px' },
            {
                data: 'd_tnow', render: function (data, type, row, meta) {
                    var t = new Date(row.d_tnow).toISOString().split('T')
                    var date = new Date(t).toLocaleDateString('th-TH')
                    return date
                }
            },
            { data: 'd_name', width: '300px' },
            { data: 'd_access' },
            { data: 'd_sd' },
            {
                data: null, title: "จัดการข้อมูล",
                render: function (data, type, row, meta) {
                    if (id !== 'admin') {
                        return `<button class="btn btn-margin btn btn-warning font-Noto" onclick="editData('${row.d_id}')">แก้ไขข้อมูล</button>
                        <button class="btn btn-margin style="background-color: #FA7070;" font-Noto" onclick="deleteData('${row.d_id}')">ลบข้อมูล</button>`
                    } else {
                        return `
                        <button class="btn btn-margin font-Noto" style="background-color: #60d1be; color: #ffffff;" onclick="accessDate('${row.d_id}','${row.d_name}')">การเข้าถึง </button>
                        <button class="btn btn-margin font-Noto" style="background-color: #84C7F2; color: #ffffff;" onclick="editData('${row.d_id}')">แก้ไขข้อมูล</button>
                        <button class="btn btn-margin font-Noto" style="background-color: #c41411; color: #ffffff;"onclick="deleteData('${row.d_id}')">ลบข้อมูล</button>`
                    }

                },
            },
        ],
        columnDefs: [
            { className: 'text-center', targets: [0, 1, 3, 4] },
        ],
        // order: [[2, 'asc']],
        // searching: false,
        // fixedColumns: {
        //     right: 0
        // },
        // autoWidth: false,
        // scrollX: true,
        // scrollY: '65vh',
        // scrollCollapse: true,
        // paging: false,

    });

    dtable.on('order.dt search.dt', function () {
        dtable.column(0, { search: 'applied', order: 'applied' }).nodes().each(function (cell, i) {
            cell.innerHTML = i + 1;
        });
    }).draw();
    // dtable.columns.adjust().draw();
}
let AddData = () => {
    window.location.href = './../input/index.html';
}
let editData = (id) => {
    localStorage.setItem('id_data', id);
    window.location.href = './../edit/index.html';
}

let deleteData = (id) => {
    axios.post(`/ds-api/deletedata`, { d_id: id }).then(r => {
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

let Htable;
let HistoryData = (id) => {
    var content = $(`
    <h2 class="entry-title font-noto">
        ตารางประวัติการดาวน์โหลดข้อมูล
    </h2>
    <table id="TableHistory" class="table table-striped" style="width:100%">
    <thead>
        <tr>
            <th></th>
            <th>วันที่ดาวน์โหลดข้อมูล</th>
            <th>ชื่อชุดข้อมูล</th>
            <th>ชื่อไฟล์</th>
            <th>ผู้ใช้งาน</th>
        </tr>
    </thead>
    </table>`).hide().fadeIn(1000)
    $(`#History-data`).append(content)

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
    Htable = $('#TableHistory').DataTable({
        ajax: {
            async: true,
            type: "post",
            url: '/ds-api/hitstory/getdata',
            data: { id_user: id },
            dataSrc: 'data'
        },

        columns: [
            { data: null, title: "No.", width: '50px' },
            { data: 'd_tdate' },
            { data: 'dataname' },
            { data: 'datafile' },
            { data: 'username' },
        ],
        columnDefs: [
            { className: 'text-center', targets: [0] },
        ],

    });

    Htable.on('order.dt search.dt', function () {
        Htable.column(0, { search: 'applied', order: 'applied' }).nodes().each(function (cell, i) {
            cell.innerHTML = i + 1;
        });
    }).draw();
}
// Htable.ajax.reload();
// setInterval(function () {
//     console.log("Oooo Yeaaa!");
// }, 15000);

let gotoinput = () => {
    window.location.href = './../input/index.html';
}

let logout = () => {
    localStorage.clear();
    window.location.href = './../dashboard/index.html';
}

$('.mobile-nav-toggle').on('click', function (e) {
    var content;
    if (val1 == 'administrator' && val2 == 'admin') {
        content = `
        <div class="d-flex flex-column " id="memu_mobile">
        <a class="btn-memu" href="./../dashboard/index.html"><i class="bi bi-house-door"></i> <span>หน้าหลัก</span></a>
        <a class="btn-memu" href="./../infordata/index.html"><i class="bi bi-box"></i> <span>ฐานข้อมูลสารสนเทศ</span></a>
        <a class="btn-memu" href="./../input/index.html"><i class="bi bi-file-earmark-arrow-up"></i> <span>นำเข้าข้อมูล</span> </a>
        <a class="btn-memu" href="./../manage/index.html"><i class="bi bi-tools"></i> <span>จัดการข้อมูล</span> </a>
        <a type="button" class="btn-memu" onclick="logout()"><i class="bi bi-door-closed"></i> <span>ออกจากระบบ</span> </a>
        <a class="btn-memu" href="https://engrids.soc.cmu.ac.th/" disabled><i class="bi bi-phone"></i><span>ติดต่อเรา</span></a>
      </div>`
    } else if (val1 !== null && val2 !== null) {
        content = `
        <a class="btn-memu" href="./../dashboard/index.html"><i class="bi bi-house-door"></i> <span>หน้าหลัก</span></a>
        <a class="btn-memu" href="./../infordata/index.html"><i class="bi bi-box"></i> <span>ฐานข้อมูลสารสนเทศ</span></a>
        <a type="button" class="btn-memu" onclick="logout()"><i class="bi bi-door-closed"></i> <span>ออกจากระบบ</span> </a>
        <a class="btn-memu" href="https://engrids.soc.cmu.ac.th/" disabled><i class="bi bi-phone"></i><span>ติดต่อเรา</span></a>
      </div>`
    } else {
        content = `
        <div class="d-flex flex-column " id="memu_mobile">
        <a class="btn-memu" href="./../dashboard/index.html"><i class="bi bi-house-door"></i> <span>หน้าหลัก</span></a>
        <a class="btn-memu" href="./../infordata/index.html"><i class="bi bi-box"></i> <span>ฐานข้อมูลสารสนเทศ</span></a>
        <a type="button" class="btn-memu" onclick="loginPopup()"><i class="bi bi-door-open"></i><span>เข้าสู่ระบบ</span></a>
       
        <a class="btn-memu" href="https://engrids.soc.cmu.ac.th/" disabled><i class="bi bi-phone"></i><span>ติดต่อเรา</span></a>
      </div>`
    }

    $('#navbar').css({ display: 'none' })
    Swal.fire({
        title: '<h3><span class="font-noto"><b>เมนู</b></span></h3><hr>',
        // icon: 'info',
        html: content + '<hr>',
        confirmButtonText: 'ปิด',
        customClass: {
            container: 'font-noto',
            title: 'font-noto',
        },
        allowOutsideClick: false,
        // allowEscapeKey: false,
        // showConfirmButton: false,
        // showCloseButton: false,
        // showCancelButton: true,
        preConfirm: async () => {
            window.location.reload()
        }
    })
})

let gotodownload = (id_data) => {
    localStorage.setItem('id_data', id_data);
    window.open('./../detail/index.html', '_blank');

}