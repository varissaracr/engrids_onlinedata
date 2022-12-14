
let val1
let val2
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

const id_data = localStorage.getItem('id_data');
const code = getCookie("open_code");
const firstname_TH = getCookie("open_firstname_TH");
const lastname_TH = getCookie("open_lastname_TH");
const student_id = getCookie("open_student_id");
const organization_name_TH = getCookie("open_organization_name_TH");

let refreshPage = () => {
    location.reload(true);
}

let gotoProfile = () => {
    location.href = "./../profile/index.html";
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

let gotoLogin = () => {
    let url = 'https://oauth.cmu.ac.th/v1/Authorize.aspx?response_type=code' +
        '&client_id=JDxvGSrJv9RbXrxGQAsj0x4wKtm3hedf2qw3Cr2s' +
        '&redirect_uri=http://localhost/login/index.html' +
        '&scope=cmuitaccount.basicinfo' +
        '&state=detail'
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
        '&redirect_uri=https://open.engrids.soc.cmu.ac.th/login/' +
        '&scope=cmuitaccount.basicinfo' +
        '&state=detail'
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
} else {
    $('#profile').html(`<a href="#" onclick="gotoLogin()"><i class="bx bx-exit"></i><span class="ff-noto">เข้าสู่ระบบ</span></a>`);
    gotoLogin()
}

$(document).ready(function () {
    load_data(id_data)
})

let load_data = (id) => {
    axios.post('/ds-api/loaddata', { d_id: id }).then(r => {
        var data = r.data.data;
        // console.log(data[0])
        if (code) {
            document.title = data[0].d_name;
            var t = new Date(data[0].d_tnow).toISOString().split('T')
            var date = new Date(t[0]).toLocaleDateString('th-TH')
            $('#dname').text(data[0].d_name)
            $('#ddetail').text(data[0].d_detail)
            $('#v1').text(data[0].d_id)
            $('#v4').text(data[0].d_tmeta)
            $('#v5').text(date)
            $('#v6').text(data[0].d_type)
            $('#v7').text(data[0].d_username)
            $('#v8').text(data[0].d_source)
            var group = JSON.parse(data[0].d_groups)
            $('#v2').text(group.join())

            var keywords = JSON.parse(data[0].d_keywords)
            keywords.map(i => {
                var content = $(`
            <div class="keyword mr-2" value="${i}">
            <h2>${i}</h2>
            </div>`)
                $(`#v3`).append(content)
            })
            genFiles(data[0].d_datafiles, data[0].d_type, date)
        } else if (data[0].d_access !== 'publish' && val2 == 'admin') {
            document.title = data[0].d_name;
            var t = new Date(data[0].d_tnow).toISOString().split('T')
            var date = new Date(t[0]).toLocaleDateString('th-TH')
            $('#dname').text(data[0].d_name)
            $('#ddetail').text(data[0].d_detail)
            $('#v1').text(data[0].d_id)
            $('#v4').text(data[0].d_tmeta)
            $('#v5').text(date)
            $('#v6').text(data[0].d_type)
            $('#v7').text(data[0].d_username)
            $('#v8').text(data[0].d_source)
            var group = JSON.parse(data[0].d_groups)
            $('#v2').text(group.join())

            var keywords = JSON.parse(data[0].d_keywords)
            keywords.map(i => {
                var content = $(`
            <div class="keyword mr-2" value="${i}">
            <h2>${i}</h2>
            </div>`)
                $(`#v3`).append(content)
            })
            genFiles(data[0].d_datafiles, data[0].d_type, date)
        } else {
            Swal.fire({
                icon: 'error',
                title: 'ไม่สามารถเข้าถึงข้อมูลได้',
                text: "กรุณาเข้าสู่ระบบ",
                customClass: {
                    container: 'ff-noto',
                    title: 'ff-noto',
                },
                allowOutsideClick: false,
                allowEscapeKey: false,
            }).then((result) => {
                if (result.isConfirmed) {
                    window.location.href = './../infordata/index.html';
                }
            })
        }
    })
}
let genFiles = async (data, type, time) => {
    var json = JSON.parse(data)
    // console.log(json)
    var Files = json[0].Files
    if (Files) {
        Files.map((i, index) => {
            var ff = dataURLtoFile(i.file, i.filename)
            // console.log(ff)
            var url = window.URL.createObjectURL(ff);
            var code = url.split('/').pop()

            var icon = conTypeFile(i.type, type)
            var datetime
            if (i.date) {
                // console.log(i.date)
                // console.log(new Date(Date(i.date)).toLocaleDateString('th-TH'))
                // var t = Date(i.date).toISOString().split('T')
                // var date = new Date(t[0]).toLocaleDateString('th-TH')
                // var today = new Date(Date(i.date));
                // var date = today.getDate() + '/' + (today.getMonth() + 1) + '/' + today.getFullYear();
                // console.log(date)
                datetime = new Date(Date(i.date)).toLocaleDateString('th-TH')
            } else {
                datetime = time
            }

            var content = $(`
           <div class="item-file" name="${i.filename}" src="${url}" code="${code}" type="${ff.type}" date="${datetime}">
           ${icon}&nbsp;&nbsp;&nbsp;
           <span class="m-auto">${i.filename}</span>
           </div>`)
            $(`#listfiles`).append(content)
        })
    }
    //////////////
    var Url = json[0].Links
    if (Url) {
        await Url.map((i, index) => {
            if (i.date) {
                var t = new Date(i.date).toISOString().split('T')
                var date = new Date(t[0]).toLocaleDateString('th-TH')
                datetime = date
            } else {
                datetime = time
            }

            var content = $(`
        <div class="item-file" name="${i.name}" src="${i.link}" type="${i.type}" code="-" date="${datetime}">
        <img src="./../assets/img/icon-file/url.png" alt="icon-file-url"
        width="60px">&nbsp;&nbsp;&nbsp;
        <span class="m-auto">${i.name}</span>
        </div>`)
            $(`#listfiles`).append(content)
        })
    }

    var n = $("#listfiles").children(".item-file").length;
    $('#sumfiles').text(`(${n})`)

    await $('.item-file').click(function () {
        var url = $(this).attr('src');
        var code = $(this).attr('code');
        var name = $(this).attr('name');
        var date = $(this).attr('date');
        var type = $(this).attr('type');
        detail_file(date, type, code, url, name)
    })

    var fname = $('#listfiles').children('.item-file:first').attr('name')
    var ftype = $('#listfiles').children('.item-file:first').attr('type')
    var furl = $('#listfiles').children('.item-file:first').attr('src')
    var fcode = $('#listfiles').children('.item-file:first').attr('code')
    var ftime = $('#listfiles').children('.item-file:first').attr('date')
    await detail_file(ftime, ftype, fcode, furl, fname)
}
let dataURLtoFile = (dataUrl, fileName) => {
    var arr = dataUrl.split(','),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    // var ff = new File([u8arr], fileName, { type: mime })
    return new File([u8arr], fileName, { type: mime });
}

let conTypeFile = (type, category) => {
    if (type == "pdf") {
        return `<img src="./../assets/img/icon-file/pdf-1.png" alt="icon-file-pdf"
        width="60px">`
    } else if (type == 'jpeg' || type == 'jpg') {
        return `<img src="./../assets/img/icon-file/image.png" alt="icon-file-image"
        width="60px">`
    }
    // else if (type == 'png') {
    //     return '<i class="fas fa-file-image text-primary"></i>'
    // }
    // else if (type == 'gif') {
    //     return '<i class="fas fa-file-image text-muted"></i>'
    // }
    else if (type == 'doc') {
        return `<img src="./../assets/img/icon-file/doc.png" alt="icon-file-doc"
        width="60px">`
    }
    else if (type == 'docx') {
        return `<img src="./../assets/img/icon-file/word.png" alt="icon-file-docx"
        width="60px">`
    }
    else if (type == 'xls') {
        return `<img src="./../assets/img/icon-file/xls.png" alt="icon-file-xls"
        width="60px">`
    } else if (type == 'xlsx') {
        return `<img src="./../assets/img/icon-file/excel.png" alt="icon-file-xlsx"
        width="60px">`
    } else if (type == 'csv') {
        return `<img src="./../assets/img/icon-file/excel.png" alt="icon-file-csv"
        width="60px">`
    }
    else if (type == 'ppt') {
        return `<img src="./../assets/img/icon-file/ppt.png" alt="icon-file-ppt"
        width="60px">`
    }
    else if (type == 'pptx') {
        return `<img src="./../assets/img/icon-file/powerpoint.png" alt="icon-file-pptx"
        width="60px">`
    }
    else if (type == 'zip' || type == 'rar') {
        if (category == 'ข้อมูลภูมิสารสนเทศเชิงพื้นที่') {
            return `<img src="./../assets/img/icon-file/shp.png" alt="icon-file-ppt"
            width="60px">`
        } else {
            return `<img src="./../assets/img/icon-file/zip-1.png" alt="icon-file-ppt"
        width="60px">`}
    }
    else {
        return `<img src="./../assets/img/icon-file/text.png" alt="icon-file"
    width="60px">`}

}
// $('.item-file').click(function () {
//     var data = $(this).attr('value')
//     console.log($(this))
//     console.log(click)
// })
let detail_file = (i1, i2, i3, url, name) => {
    $('#filename').text(name)
    // var t = new Date(i1).toISOString().split('T')
    // var date = new Date(t[0]).toLocaleDateString('th-TH')
    var date = i1
    $(`#detaifile`).empty().append(content)
    if (i2 == 'API' || i2 == 'URL' || i2 == 'GD') {
        var content = $(`
        <div class="data-detail ff-noto mt-3">
        <div class="list-detail">
            <div class="row pt-2 pb-2 bb-2">
                <div class="col-lg-4">
                    <span><b>วันที่ปรับปรุงเนื้อหาข้อมูลล่าสุด</b></span>
                </div>
                <div class="col-lg-8">
                    <span>${date}</span>
                </div>
            </div>
            <div class="row pt-2 pb-2 bb-2">
                <div class="col-lg-4">
                    <span><b>รูปแบบของไฟล์ชุดข้อมูล</b></span>
                </div>
                <div class="col-lg-8">
                    <span>${i2 !== 'GD' ? i2 : 'Google Drive'}</span>
                </div>
            </div>
            <div class="row pt-2 pb-2 bb-2">
                <div class="col-lg-4">
                    <span><b>รหัสทรัพยากรข้อมูล</b></span>
                </div>
                <div class="col-lg-8">
                    <span>${i3}</span>
                </div>
            </div>
        </div>
        <div class="d-flex justify-content-center">
        <a onclick="history.back()" class="btn-download mt-4"><sapn class="ff-noto">ย้อนกลับ</sapn></a>&nbsp;&nbsp;
            <a href="${url}" target="_blank" class="btn-download mt-4"><sapn class="ff-noto">ไปยังชุดข้อมูล</sapn></a> 
            
        </div>
        </div>`)
        $(`#detaifile`).empty().append(content)
    } else {
        var content = $(`
        <div class="data-detail ff-noto mt-3">
        <div class="list-detail">
            <div class="row pt-2 pb-2 bb-2">
                <div class="col-lg-4">
                    <span><b>วันที่ปรับปรุงเนื้อหาข้อมูลล่าสุด</b></span>
                </div>
                <div class="col-lg-8">
                    <span>${date}</span>
                </div>
            </div>
            <div class="row pt-2 pb-2 bb-2">
                <div class="col-lg-4">
                    <span><b>รูปแบบของไฟล์ชุดข้อมูล</b></span>
                </div>
                <div class="col-lg-8">
                    <span>${i2}</span>
                </div>
            </div>
            <div class="row pt-2 pb-2 bb-2">
                <div class="col-lg-4">
                    <span><b>รหัสทรัพยากรข้อมูล</b></span>
                </div>
                <div class="col-lg-8">
                    <span>${i3}</span>
                </div>
            </div>
        </div>
        <div class="d-flex justify-content-center">
        <a onclick="history.back()" class="btn-download mt-4"><sapn class="ff-noto">ย้อนกลับ</sapn></a>&nbsp;&nbsp;
            <a href="${url}" download="${name}" target="_blank" class="btn-download mt-4 ${code ? null : 'disabled'}" onclick="SD_download('${name}')" ><span class="ff-noto">ดาวน์โหลด</span> </a>
        </div>
        ${code ? '' : '<p class="text-center text-danger m-auto p-3">*กรุณา login ก่อนเพื่อทำดาวน์โหลดข้อมูล / ติดต่อเจ้าหน้าที่เพื่อขอข้อมูล</p>'}
        </div>`)
        $(`#detaifile`).empty().append(content)
    }
}

let SD_download = async (namefile) => {

    await axios.post('/sd', { d_id: id_data }).then(r => {
        console.log(r.data.data)
    })

    var today = new Date();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

    var data = {
        username: val1,
        id_user: val2,
        dataid: id_data,
        dataname: document.title,
        datafile: namefile,
        d_tdate: new Date().toLocaleDateString('th-TH') + ' ' + time,
    }

    await axios.post('/hitstory', { data: data }).then(r => {
        console.log(r.data.data)
    })

}

// $('#login').click(function () { loginPopup() })

const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
    didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
})

$('.mobile-nav-toggle').on('click', function (e) {
    var content;
    if (val1 == 'administrator' && val2 == 'admin') {
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

