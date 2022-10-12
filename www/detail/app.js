const id_data = localStorage.getItem('id_data');
var val1 = localStorage.getItem('value1');
var val2 = localStorage.getItem('value2');

const urlapi = `https://engrids.soc.cmu.ac.th/api/ds-api`

// const queryString = window.location.search;
// const urlParams = new URLSearchParams(queryString);
// // let params = new URLSearchParams(url.search);
// const baz = urlParams.get('baz')
// const keyword = urlParams.get('keyword')
// console.log(baz);
// console.log(keyword);

// const url = new URL(window.location.href);
// url.searchParams.set('keyword', 'คำสำคัญ');
// console.log(url.search.toString())

// let url2 = new URL('https://example.com?foo=1&bar=2');
// let params = new URLSearchParams(url.search);

// Add a third parameter.
// params.set('baz', 3);
// params.toString();

// console.log(params)
// console.log(params.toString())

$(document).ready(function () {
    // load_data('6EYcI0YX-u0ls-40j3-PTdy-oiVwb3UYlJk9')
    // console.log(id_data)
    console.log(val1, val2)
    if (val1 !== null && val2 !== null) {
        $('#login').hide(function () {
            $('#Profile').show()
            $('#username').text(val1)
        })
    } else {
        $('#Profile').hide()
    }
    load_data(id_data)
})
let load_data = (id) => {
    axios.post(urlapi + '/loaddata', { d_id: id }).then(r => {
        var data = r.data.data;
        // console.log(data[0])
        if (data[0].d_access == 'publish' && val2) {
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
                text: "กรุณาลองอีกครั้งในภายหลัง",
                customClass: {
                    container: 'ff-noto',
                    title: 'ff-noto',
                },
                allowOutsideClick: false,
                allowEscapeKey: false,
            }).then((result) => {
                if (result.isConfirmed) {
                    window.location.href = './../index.html';
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
        <a href="./../index.html" class="btn-download mt-4"><sapn class="ff-noto">ย้อนกลับ</sapn></a>&nbsp;&nbsp;
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
        <a href="./../index.html" class="btn-download mt-4"><sapn class="ff-noto">ย้อนกลับ</sapn></a>&nbsp;&nbsp;
            <a href="${url}" download="${name}" target="_blank" class="btn-download mt-4 ${val2 ? null : 'disabled'}" onclick="SD_download('${name}')" ><span class="ff-noto">ดาวน์โหลด</span> </a>
        </div>
        ${val2 ? '' : '<p class="text-center text-danger m-auto p-3">*กรุณา login ก่อนเพื่อทำดาวน์โหลดข้อมูล / ติดต่อเจ้าหน้าที่เพื่อขอข้อมูล</p>'}
        </div>`)
        $(`#detaifile`).empty().append(content)
    }
}

let SD_download = async (namefile) => {

    await axios.post(urlapi + '/sd', { d_id: id_data }).then(r => {
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

    await axios.post(urlapi + '/hitstory', { data: data }).then(r => {
        console.log(r.data.data)
    })

}

$('#login').click(function () { loginPopup() })

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


const loginPopup = () => {
    Swal.fire({
        title: 'เข้าสู่ระบบ',
        html:
            '<input id="username" class="swal2-input" type="text" placeholder="Username">' +
            '<input id="password" class="swal2-input" type="password" placeholder="Password">',
        focusConfirm: true,
        customClass: {
            container: 'ff-noto',
            title: 'ff-noto',
        },
        showCloseButton: false,
        confirmButtonText: 'เข้าสู่ระบบ',
        confirmButtonColor: '#3085d6',
        footer: '<a href=""><b>ลืมรหัสผ่าน</b></a><hr class="perpendicular-line"><a href=""><b>สมัครผู้ใช้ใหม่</b></a>',

        showCancelButton: false,
        preConfirm: async () => {
            const username = Swal.getPopup().querySelector('#username').value
            const password = Swal.getPopup().querySelector('#password').value
            if (!loginPopup || !password) {
                Swal.showValidationMessage(`Please enter username and password`)
            }
            return { username: username, password: password }

        },
    }).then((result) => {
        if (result.isConfirmed) {
            let data = {
                username: result.value.username,
                password: result.value.password
            }
            axios.post("https://engrids.soc.cmu.ac.th/api/fuser-api/userid", data).then(r => {
                // console.log(r.data.data)
                if (r.data.data !== 'false') {
                    var userid = r.data.data[0].id_user
                    var username = r.data.data[0].username

                    localStorage.setItem('value1', username);
                    localStorage.setItem('value2', userid);

                    // $('#login').fadeOut(function () {
                    //     $('#Profile').fadeIn(2500)
                    //     $('#username').text(username)
                    // })

                    Toast.fire({
                        icon: 'success',
                        title: 'Signed in successfully'
                    })

                    setTimeout(function () {
                        window.location.reload()
                    }, 2400)

                } else {
                    Swal.fire({
                        title: 'ไม่สามารถเข้าสู่เข้าระบบได้!',
                        text: 'กรุณาตรวจสอบชื่อผู้ใช่/รหัสผ่าน ให้ถูกต้อง',
                        icon: 'error',
                        // iconColor: ''
                        confirmButtonText: 'ปิด',
                        // footer: '<a href=""><b>เข้าสู้ระบบ</b></a>',
                        customClass: {
                            container: 'ff-noto',
                            title: 'ff-noto',
                            confirmButton: 'btn btn-secondary',
                        },
                        preConfirm: async () => {
                            loginPopup()
                        }
                    })
                }
            })
        } else if (
            result.dismiss === Swal.DismissReason.cancel
        ) {
            window.location.reload()
        }
    })
};

let logout = () => {
    localStorage.clear();
    window.location.href = './../dashboard/index.html';
}

$('.mobile-nav-toggle').on('click', function (e) {
    var content;
    if (val1 && val2) {
        content = `
        <div class="d-flex flex-column " id="memu_mobile">
        <a class="btn-memu" href="index.html"><i class="bi bi-house-door"></i> <span>Home</span></a>
        <a class="btn-memu" href="index.html"><i class="bi bi-box"></i> <span>ระบบฐานข้อมูลสารสนเทศ</span></a>
        <a type="button" class="btn-memu" onclick="logout()"><i class="bi bi-door-closed"></i> <span>Logout</span> </a>
        <a class="btn-memu" href="#" disabled><i class="bi bi-phone"></i><span>Contact</span></a>
      </div>`
    } else {
        content = `
        <div class="d-flex flex-column " id="memu_mobile">
        <a class="btn-memu" href="index.html"><i class="bi bi-house-door"></i> <span>Home</span></a>
        <a class="btn-memu" href="index.html"><i class="bi bi-box"></i> <span>ระบบฐานข้อมูลสารสนเทศ</span></a>
        <a type="button" class="btn-memu" onclick="loginPopup()"><i class="bi bi-door-open"></i><span>Login</span></a>
        <a class="btn-memu" href="#" disabled><i class="bi bi-phone"></i><span>Contact</span></a>
      </div>`
    }
    Swal.fire({
        title: '<h3><b>Memu</b></h3><hr>',
        // icon: 'info',
        html: content + '<hr>',
        confirmButtonText: 'close'
        // showConfirmButton: false,
        // showCloseButton: false,
        // showCancelButton: true,
    })
})
