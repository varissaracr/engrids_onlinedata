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
const organization_name_TH = getCookie("open_organization_name_TH");
const cmuitaccount = getCookie("open_cmuitaccount");
const itaccounttype = getCookie("open_itaccounttype_th");
const auth = getCookie("open_auth");

let refreshPage = () => {
    location.reload(true);
}

let gotoLogin = () => {
    let url = 'https://oauth.cmu.ac.th/v1/Authorize.aspx?response_type=code' +
        '&client_id=JDxvGSrJv9RbXrxGQAsj0x4wKtm3hedf2qw3Cr2s' +
        '&redirect_uri=http://localhost/login/index.html' +
        '&scope=cmuitaccount.basicinfo' +
        '&state=admin'
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
        '&redirect_uri=http://localhost/login/index.html' +
        '&scope=cmuitaccount.basicinfo' +
        '&state=admin'
    window.location.href = url;
};

let gotoProfile = () => {
    location.href = "./../profile/index.html";
}

let gotoAdmin = () => {
    location.href = './index.html';
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

let editData = (d_id) => {
    sessionStorage.setItem('d_id', d_id);
    // window.location.href = './../edit/index.html';
    location.href = './../edit/index.html';
}

let editUser = (firstname_TH, lastname_TH, student_id, organization_name_TH, open_cmuitaccount, open_itaccounttype_th, open_auth) => {
    // console.log(firstname_TH, lastname_TH, student_id, organization_name_TH, open_cmuitaccount, open_itaccounttype_th, open_auth)
    sessionStorage.setItem('open_firstname_TH', firstname_TH);
    sessionStorage.setItem('open_lastname_TH', lastname_TH);
    sessionStorage.setItem('open_student_id', student_id);
    sessionStorage.setItem('open_organization_name_TH', organization_name_TH);
    sessionStorage.setItem('open_cmuitaccount', open_cmuitaccount);
    sessionStorage.setItem('open_itaccounttype_th', open_itaccounttype_th);
    sessionStorage.setItem('open_auth', open_auth);
    sessionStorage.setItem('adminview', "yes");
    // sessionStorage.setItem('open_dd', cmuitaccount);
    // window.location.href = './../profile/index.html';
    location.href = './../profile/index.html';
}

let gotodownload = (d_id) => {
    sessionStorage.setItem('d_id', d_id);
    window.open('./../detail/index.html', '_blank');
}

let deleteData = (d_id) => {
    axios.post(`/ds-api/deletedata`, { d_id }).then(r => {
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

let deleteUser = (cmuitaccount) => {
    axios.post(`/ds-api/deleteuser`, { cmuitaccount }).then(r => {
        var Sucss = r.data.data;
        if (Sucss == 'success') {
            Swal.fire({
                icon: 'success',
                title: 'ลบผู้ใช้สำเร็จ',
                text: 'ข้อมูลของคุณถูกลบสำเร็จ',
                customClass: {
                    container: 'font-noto',
                    title: 'font-noto',
                },
            }).then((result) => {
                if (result.isConfirmed) {
                    utable.ajax.reload();
                    // window.location.reload()
                }
            })
        }
    })
}

if (code && auth == "admin") {
    $('#profile').html(`<li class="dropdown" > <a class="active" href="#" > <i class="bi bi-person-circle" style="font-size: 22px;"></i> <span class="font-noto">&nbsp; ${firstname_TH}</span> <i class="bi bi-chevron-down"> </i> </a> 
            <ul>
                <li><a href="#" onclick="gotoProfile()"><span class="font-noto">โปรไฟล์</span> </a></li>
                <li><a href="#" onclick="gotoInput()"><span class="font-noto">เพิ่มข้อมูล</span></a></li>
                <li><a href="#" onclick="gotoManage()"><span class="font-noto">การจัดการข้อมูล</span></a></li>
                <li><a href="#" onclick="gotoAdmin()"><span class="font-noto">การจัดการผู้ใช้</span></a></li>
                <li><a href="#" onclick="gotoLogout()"><span class="font-noto">ออกจากระบบ</span><i class="bi bi-door-closed" style="font-size: 18px;"></i></a></li>
            </ul>
        </li>`)
} else {
    $('#profile').html(`<a href="#" onclick="gotoLogin()"><i class="bx bx-exit"></i><span class="font-noto">เข้าสู่ระบบ</span></a>`);
    gotoLogin()
}

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


let utable = $('#TableUser').DataTable({
    ajax: {
        async: true,
        type: "POST",
        url: '/ds-api/listuser',
        data: { cmuitaccount },
        dataSrc: 'data'
    },

    columns: [
        {
            data: null, render: function (data, type, row, meta) {
                return meta.row + 1
            }
        },
        { data: 'firstname_th' },
        { data: 'lastname_th' },
        { data: 'organization_name' },
        { data: 'cmuitaccount' },
        { data: 'auth' },
        // {
        //     data: 'dt', render: function (data, type, row, meta) {
        //         var t = new Date(row.d_tnow).toISOString().split('T')
        //         var date = new Date(t).toLocaleDateString('th-TH')
        //         return date
        //     }
        // },


        {
            data: null, title: "จัดการข้อมูล",
            render: function (data, type, row, meta) {
                // console.log(row)
                return `<button class="btn btn-margin font-Noto" style="background-color: #60d1be; color: #ffffff;"onclick="setadmin('${row.cmuitaccount}')">สิทธิ์ผู้ใช้</button>
                        <button class="btn btn-margin font-Noto" style="background-color: #84C7F2; color: #ffffff;" onclick="editUser('${row.firstname_th}','${row.lastname_th}','${row.student_id}','${row.organization_name}','${row.cmuitaccount}','${row.itaccounttype_th}','${row.auth}')">ข้อมูลผู้ใช้</button>
                        <button class="btn btn-margin font-Noto" style="background-color: #c41411; color: #ffffff;"onclick="deleteUser('${row.cmuitaccount}')">ลบผู้ใช้</button>`
            },
        },
    ],
    scrollX: true,
    // columnDefs: [
    //     { className: 'text-center', targets: [0, 1, 3, 4] },
    // ],
});

let dtable = $('#TableData').DataTable({
    ajax: {
        async: true,
        type: "POST",
        url: '/ds-api/listmember',
        data: { cmuitaccount },
        dataSrc: 'data'
    },

    columns: [
        {
            data: null, render: function (data, type, row, meta) {
                return meta.row + 1
            }
        },
        { data: 'firstname_th' },
        { data: 'lastname_th' },
        { data: 'organization_name' },
        { data: 'd_name' },
        { data: 'd_detail' },
        { data: 'd_access' },
        {
            data: 'd_tnow', render: function (data, type, row, meta) {
                var t = new Date(row.d_tnow).toISOString().split('T')
                var date = new Date(t).toLocaleDateString('th-TH')
                return date
            }
        }, {
            data: null, title: "จัดการข้อมูล",
            render: function (data, type, row, meta) {
                return `<button class="btn btn-margin font-Noto" style="background-color: #60d1be; color: #ffffff;" onclick="accessData('${row.d_id}','${row.d_name}')">การเข้าถึง </button>
                        <button class="btn btn-margin font-Noto" style="background-color: #84C7F2; color: #ffffff;" onclick="editData('${row.d_id}')">แก้ไขข้อมูล</button>
                        <button class="btn btn-margin font-Noto" style="background-color: #c41411; color: #ffffff;"onclick="deleteData('${row.d_id}')">ลบข้อมูล</button>`
            },
        },
    ],
    scrollX: true,
    // columnDefs: [
    //     { className: 'text-center', targets: [0, 1, 3, 4] },
    // ],
});


let setadmin = (cmuitaccount) => {
    Swal.fire({
        title: 'กำหนดสิทธิ์ผู้ใช้',
        html:
            `<select class="form-select" aria-label="Default select example" id="auth">
                <option hidden>เลือก...</option>
                <option value="admin">admin</option>
                <option value="user">user</option>
            </select>
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
            const auth = Swal.getPopup().querySelector('#auth').value
            return { auth: auth }
        }
    }).then((result) => {
        if (result.value) {
            var data = {
                cmuitaccount: cmuitaccount,
                auth: result.value.auth
            }
            // console.log(data)
            // console.log(result.value.auth)
            axios.post('/ds-api/setuser', data).then((r) => {
                var Sucss = r.data.data;

                // console.log(Sucss)
                if (Sucss == 'success') {
                    Swal.fire({
                        icon: 'success',
                        title: 'กำหนดสิทธิ์เป็น ' + result.value.auth + ' สำเร็จ',
                        confirmButtonText: 'ปิด',
                        confirmButtonColor: '#000000',
                        customClass: {
                            container: 'font-noto',
                            title: 'font-noto',
                        },
                    })
                    utable.ajax.reload();
                }
            })
        }
    })
}

let accessData = (id, name) => {
    Swal.fire({
        title: 'กำหนดสิทธิ์ในการเข้าถึงข้อมูล',
        html:
            `<select class="form-select" aria-label="Default select example" id="access">
                <option hidden>เลือก...</option>
                <option value="private">private</option>
                <option value="publish">publish</option>
            </select>
           
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

let dwtable = $('#TableDownload').DataTable({
    ajax: {
        async: true,
        type: "POST",
        url: '/ds-api/hitstory/getdata',
        data: { auth },
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
    scrollX: true,

});

dwtable.on('order.dt search.dt', function () {
    dwtable.column(0, { search: 'applied', order: 'applied' }).nodes().each(function (cell, i) {
        cell.innerHTML = i + 1;
    });
}).draw();

// }

//     // columnDefs: [
//     //     { className: 'text-center', targets: [0, 1, 3, 4] },
//     // ],
// });

// let HistoryData = (id) => {
//     console.log(id)
//     var content = $(`
//     <h2 class="entry-title font-noto">
//         ตารางประวัติการดาวน์โหลดข้อมูล
//     </h2>
//     <table id="TableHistory" class="table table-striped" style="width:100%">
//     <thead>
//         <tr>
//             <th></th>
//             <th>วันที่ดาวน์โหลดข้อมูล</th>
//             <th>ชื่อชุดข้อมูล</th>
//             <th>ชื่อไฟล์</th>
//             <th>ผู้ใช้งาน</th>
//         </tr>
//     </thead>
//     </table>`).hide().fadeIn(1000)
//     $(`#History-data`).append(content)

//     $.extend(true, $.fn.dataTable.defaults, {
//         "language": {
//             "sProcessing": "กำลังดำเนินการ...",
//             "sLengthMenu": "แสดง_MENU_ แถว",
//             "sZeroRecords": "ไม่พบข้อมูล",
//             "sInfo": "แสดง _START_ ถึง _END_ จาก _TOTAL_ แถว",
//             "sInfoEmpty": "แสดง 0 ถึง 0 จาก 0 แถว",
//             "sInfoFiltered": "(กรองข้อมูล _MAX_ ทุกแถว)",
//             "sInfoPostFix": "",
//             "sSearch": "ค้นหา:",
//             "sUrl": "",
//             "oPaginate": {
//                 "sFirst": "เริ่มต้น",
//                 "sPrevious": "ก่อนหน้า",
//                 "sNext": "ถัดไป",
//                 "sLast": "สุดท้าย"
//             },
//             "emptyTable": "ไม่พบข้อมูล..."
//         }
//     });
//     Htable = $('#TableHistory').DataTable({
//         ajax: {
//             async: true,
//             type: "post",
//             url: '/ds-api/hitstory/getdata',
//             data: { id_user: id },
//             dataSrc: 'data'
//         },

//         columns: [
//             { data: null, title: "No.", width: '50px' },
//             { data: 'd_tdate' },
//             { data: 'dataname' },
//             { data: 'datafile' },
//             { data: 'username' },
//         ],
//         columnDefs: [
//             { className: 'text-center', targets: [0] },
//         ],

//     });

//     Htable.on('order.dt search.dt', function () {
//         Htable.column(0, { search: 'applied', order: 'applied' }).nodes().each(function (cell, i) {
//             cell.innerHTML = i + 1;
//         });
//     }).draw();
// }

$('.mobile-nav-toggle').on('click', function (e) {
    var content;
    if (code && auth == 'admin') {
        content = `
        <div class="d-flex flex-column " id="memu_mobile">
        <a class="btn-memu" href="./../dashboard/index.html"><i class="bi bi-house-door"></i> หน้าหลัก </a>
        <a class="btn-memu" href="./../infordata/index.html"><i class="bi bi-box"></i> ฐานข้อมูลสารสนเทศ </a>
        <div class="cd-accordion__item cd-accordion__item--has-children">
            <input class="cd-accordion__input" type="checkbox" name="group-1" id="group-1">
                <label class="cd-accordion__label cd-accordion__label--icon-folder btn-memu" for="group-1"><a class="" ><i class="bi bi-person-circle" style="font-size: 22px;"></i> ${firstname_TH} </a></label>
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
            <label class="cd-accordion__label cd-accordion__label--icon-folder btn-memu " for="group-1"><a class=""><i class="bi bi-person-circle" style="font-size: 22px;"></i> ${firstname_TH} </a></label>
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