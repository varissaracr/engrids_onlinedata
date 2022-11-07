
sessionStorage.clear();

// const url = "https://engrids.soc.cmu.ac.th/api";
const url = "http://localhost:3000";

$(window).on('load', function () {
    if ($('#preloader').length) {
        $('#preloader').delay(100).fadeOut('slow', function () {
            $(this).remove();
        });
    }
});

function onLocationError(e) {
    console.log(e.message);
}

function refreshPage() {
    location.reload(true);
}

let checkdata = async () => {
    var x = document.getElementById("username").value;
    console.log(x);
    let a = 0;
    $("#detail").empty();
    if (!x) {
        console.log(x);
        $("#detail").append(`<span> ชื่อ </span>`);
        a += 1
    }
    if (!$('#password').val()) {
        $("#detail").append(`<span> รหัสผ่าน</span>`);
        a += 1
    }

    a > 0 ? $('#errormodal').modal('show') : sendData();
}

$("#accountcheck").hide()
$('#username').on("keyup", function () {
    let user = $("#username").val()
    axios.post(url + "/profile-api/chkuser", { user }).then(r => {
        console.log(r);
        r.data.data[0].count !== '0' ? $("#accountcheck").show() : $("#accountcheck").hide()
    })
})

$('#username').on("input", function () {
    if (this.value == '') {
        $("#username").addClass("is-invalid")
        // console.log("false")
    } else {
        $("#username").removeClass("is-invalid")
        // console.log("true")
    }
})
$('#password').on("input", function () {
    if (this.value == '') {
        $("#password").addClass("is-invalid")
        // console.log("false")
    } else {
        $("#password").removeClass("is-invalid")
        // console.log("true")
    }
})
$('#password2').on("input", function () {
    if (this.value == '') {
        $("#password2").addClass("is-invalid")
        console.log("false")
    } else {
        $("#password2").removeClass("is-invalid")
        console.log("true")
    }
})
$('#fullname').on("input", function () {
    if (this.value == '') {
        $("#fullname").addClass("is-invalid")
        // console.log("false")
    } else {
        $("#fullname").removeClass("is-invalid")
        // console.log("true")
    }
})
$('#studentid').on("input", function () {
    if (this.value == '') {
        $("#studentid").addClass("is-invalid")
        // console.log("false")
    } else {
        $("#studentid").removeClass("is-invalid")
        // console.log("true")
    }
})
$('#email').on("input", function () {
    if (this.value == '') {
        $("#email").addClass("is-invalid")
        console.log("false")
    } else {
        $("#email").removeClass("is-invalid")
        console.log("true")
    }
})
$('#major').on("input", function () {
    if (this.value == '') {
        $("#major").addClass("is-invalid")
        console.log("false")
    } else {
        $("#major").removeClass("is-invalid")
        console.log("true")
    }
})
$('#faculty').on("input", function () {
    if (this.value == '') {
        $("#faculty").addClass("is-invalid")
        console.log("false")
    } else {
        $("#faculty").removeClass("is-invalid")
        console.log("true")
    }
})
$('#ts_date').on("input", function () {
    if (this.value == '') {
        $("#ts_date").addClass("is-invalid")
        console.log("false")
    } else {
        $("#ts_date").removeClass("is-invalid")
        console.log("true")
    }
})

let senddata = async () => {
    if ($('#username').val() == "" || $('#password').val() == "" || $('#password2').val() == "" || $('#name').val() == "" || $('#studentid').val() == "" || $('#email').val() == "" || $('#major').val() == "" || $('#faculty').val() == "" || $('#ts_date').val() == "") {
        $("#errormodal").modal("show")
        if ($('#username').val() == "") {
            $("#username").addClass("is-invalid")
        }
        if ($('#password').val() == "") {
            $("#password").addClass("is-invalid")
        }
        if ($('#password2').val() == "") {
            $("#password2").addClass("is-invalid")
        }
        if ($('#fullname').val() == "") {
            $("#fullname").addClass("is-invalid")
        }
        if ($('#studentid').val() == "") {
            $("#studentid").addClass("is-invalid")
        }
        if ($('#email').val() == "") {
            $("#email").addClass("is-invalid")
        }
        if ($('#major').val() == "") {
            $("#major").addClass("is-invalid")
        }
        if ($('#faculty').val() == "") {
            $("#faculty").addClass("is-invalid")
        }
        if ($('#ts_date').val() == "") {
            $("#ts_date").addClass("is-invalid")
        }

    } else if ($('#username').val() !== "" || $('#password').val() !== "" || $('#password2').val() !== "" || $('#name').val() == "" || $('#studentid').val() == "" || $('#email').val() == "" || $('#major').val() == "" || $('#faculty').val() == "" || $('#ts_date').val() == "") {


        const formDataObj = {
            data: {
                // userid: userid,
                usrname: $('#username').val(),
                pass: $('#password').val(),
                fullname: $('#fullname').val(),
                studentid: $('#studentid').val(),
                sex: $('#sex').val(),
                email: $('#email').val() ? $('#email').val() : '-',
                major: $('#major').val(),
                faculty: $('#faculty').val(),
                ts: $('#ts_date').val() !== null ? $('#ts_date').val() : null,
            }
        };

        var req = req_form()
        if (req == true) {
            Swal.fire({
                icon: 'warning',
                title: 'ยืนยันการบันทึกข้อมูล',
                // text:'',
                showConfirmButton: true,
                showCancelButton: true,
                confirmButtonText: 'บันทึกข้อมูล',
                cancelButtonText: 'ยกเลิก',
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                reverseButtons: true,
                customClass: {
                    container: 'ff-noto',
                    title: 'ff-noto',
                },
                // timer: 1500
            }).then(async (result) => {
                if (result.isConfirmed) {
                    await axios.post(`http://localhost:3000/regis-api/save`, { data: formDataObj }).then(r => {
                        var Sucss = r.data.data;
                        if (Sucss == 'Save data') {
                            Swal.fire({
                                icon: 'success',
                                title: 'บันทึกข้อมูลสำเร็จ',
                                customClass: {
                                    container: 'ff-noto',
                                    title: 'ff-noto',
                                },
                            }).then((result) => {
                                if (result.isConfirmed) {
                                    window.location.href = './../manage/index.html';
                                }

                            })
                        }
                        $("#forminput").removeClass('was-validated');
                        console.log(Sucss)
                    })

                } else if (
                    /* Read more about handling dismissals below */
                    result.dismiss === Swal.DismissReason.cancel
                ) {
                    Swal.fire({
                        icon: 'error',
                        title: 'บันทึกข้อมูลไม่สำเร็จ',
                        text: 'ข้อมูลของคุณไม่ได้รับการบันทึก',
                        customClass: {
                            container: 'ff-noto',
                            title: 'ff-noto',
                        },
                    })
                }
            })
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'กรุณากรอกข้อมูลให้ครบถ้วน',
                customClass: {
                    container: 'ff-noto',
                    title: 'ff-noto',
                }
            })
        }
    }
    return false;
};
let req_form = () => {
    var form = $("#forminput")
    // console.log(form[0])

    if (form[0].checkValidity() === false) {
        event.preventDefault()
        event.stopPropagation()
    }
    form.addClass('was-validated');

    return form[0].checkValidity()
}

$('#btn-send').click(function () {
    senddata()
})

$("#passcheck").hide()
$("#password2").on("change", function () {
    $("#password2").val() == $("#password").val() ? $("#passcheck").hide() : $("#passcheck").show();
})


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

const datauser = {}

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
        footer: '<a href=""><b>ลืมรหัสผ่าน</b></a><hr class="perpendicular-line"><a href="./../register/index.html"><b>สมัครผู้ใช้ใหม่</b></a>',

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
                    datauser["userid"] = userid
                    datauser["username"] = username

                    localStorage.setItem('value1', username);
                    localStorage.setItem('value2', userid);

                    // localStorage.setItem('userid', userid);

                    $('#login').fadeOut(function () {
                        $('#Profile').fadeIn(2500)
                        $('#username').text(username)

                    })

                    Toast.fire({
                        icon: 'success',
                        title: 'เข้าสู่ระบบสำเร็จ',
                        customClass: {
                            container: 'ff-noto',
                            title: 'ff-noto',
                            confirmButton: 'btn btn-secondary',
                        },
                    })
                    window.location.href = './../dashboard/index.html';
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
            // window.location.reload()

        }
    })
};



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
        title: '<h3><span class="ff-noto"><b>เมนู</b></span></h3><hr>',
        // icon: 'info',
        html: content + '<hr>',
        confirmButtonText: 'ปิด',
        customClass: {
            container: 'ff-noto',
            title: 'ff-noto',
        },
        allowOutsideClick: false,
        // allowEscapeKey: false,
        preConfirm: async () => {
            window.location.reload()
        }
        // showConfirmButton: false,
        // showCloseButton: false,
        // showCancelButton: true,
    })
})
