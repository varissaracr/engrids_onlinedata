
var val1 = localStorage.getItem('value1');
var val2 = localStorage.getItem('value2');

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
        '&redirect_uri=http://localhost/login/index.html' +
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
        // '&redirect_uri=https://open.engrids.soc.cmu.ac.th/login/' +
        '&redirect_uri=http://localhost/login/index.html' +
        '&scope=cmuitaccount.basicinfo' +
        '&state=manage'
    window.location.href = url;
};

let gotoProfile = () => {
    location.href = "./../profile/index.html";
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
} else {
    $('#profile').html(`<a href="#" onclick="gotoLogin()"><i class="bx bx-exit"></i><span class="ff-noto">เข้าสู่ระบบ</span></a>`);
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

let dtable = $('#TableData').DataTable({
    ajax: {
        async: true,
        type: "post",
        url: '/ds-api/listmember',
        data: { d_iduser: "aa" },
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
        {
            data: 'dt', render: function (data, type, row, meta) {
                console.log(row);
                var t = new Date(row.ndate).toISOString()
                var date = new Date(t).toLocaleDateString('th-TH')
                return date
            }
        },
        {
            data: null, title: "จัดการข้อมูล",
            render: function (data, type, row, meta) {
                return `
                <div class="form-check">
  <input class="form-check-input" type="checkbox" id="check1" name="option1" value="something" checked>
  <label class="form-check-label">Option 1</label>
</div>
                <button class="btn btn-margin font-Noto" style="background-color: #60d1be; color: #ffffff;" onclick="accessDate('${row.d_id}','${row.d_name}')">การเข้าถึง </button>
                        <button class="btn btn-margin font-Noto" style="background-color: #84C7F2; color: #ffffff;" onclick="editData('${row.d_id}')">แก้ไขข้อมูล</button>
                        <button class="btn btn-margin font-Noto" style="background-color: #c41411; color: #ffffff;"onclick="deleteData('${row.d_id}')">ลบข้อมูล</button>`

            },
        },
    ],
    columnDefs: [
        { className: 'text-center', targets: [0, 1, 3, 4] },
    ],
});

dtable.on('order.dt search.dt', function () {
    // dtable.column(0, { search: 'applied', order: 'applied' }).nodes().each(function (cell, i) {
    //     cell.innerHTML = i + 1;
    // });
}).draw();
// dtable.columns.adjust().draw();



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