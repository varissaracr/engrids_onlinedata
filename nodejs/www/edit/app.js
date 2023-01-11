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

const d_id = sessionStorage.getItem('d_id');

const code = getCookie("open_code");
const firstname_TH = getCookie("open_firstname_TH");
const lastname_TH = getCookie("open_lastname_TH");
const student_id = getCookie("open_student_id");
const organization_name_TH = getCookie("open_organization_name_TH");
const cmuitaccount = getCookie("open_cmuitaccount");
const auth = getCookie("open_auth");


let refreshPage = () => {
    location.reload(true);
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

let gotoLogin = () => {
    sessionStorage.clear();
    let url = 'https://oauth.cmu.ac.th/v1/Authorize.aspx?response_type=code' +
        '&client_id=JDxvGSrJv9RbXrxGQAsj0x4wKtm3hedf2qw3Cr2s' +
        '&redirect_uri=http://localhost/login/index.html' +
        '&scope=cmuitaccount.basicinfo' +
        '&state=detail'
    window.location.href = url;
}

let gotoLogout = () => {
    sessionStorage.clear();
    document.cookie = "open_code=; max-age=0; path=/;";
    document.cookie = "open_firstname_TH=; max-age=0; path=/;";
    document.cookie = "open_lastname_TH=; max-age=0; path=/;";
    document.cookie = "open_student_id=; max-age=0; path=/;";
    document.cookie = "open_auth=; max-age=0; path=/;";
    document.cookie = "open_organization_name_TH=; max-age=0; path=/;";
    gotoIndex()
}

const loginPopup = () => {
    let url = 'https://oauth.cmu.ac.th/v1/Authorize.aspx?response_type=code' +
        '&client_id=JDxvGSrJv9RbXrxGQAsj0x4wKtm3hedf2qw3Cr2s' +
        // '&redirect_uri=http://localhost/login/' +
        '&redirect_uri=http://localhost/login/index.html' +
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
    gotoLogin()
}


$('#username').text(firstname_TH)

let loadMap = (d_id) => {
    var map = L.map('map').setView([51.505, -0.09], 13);
    const tiles = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);
    let fs = L.featureGroup().addTo(map)
    axios.post('/ds-api/loadgeojson', { d_id }).then(res => {
        res.data.map(i => {
            L.geoJSON(JSON.parse(i.geom)).addTo(fs);
            // console.log(JSON.parse(i.geom));
            // console.log(fs.getBounds());
            map.fitBounds(fs.getBounds());
        })
    })
}

let load_data = (id) => {
    axios.post('/ds-api/editdata', { d_id: id }).then(r => {
        var data = r.data.data;
        // console.log(data)
        $('#dname').val(data[0].d_name)
        $('#ddetail').val(data[0].d_detail)
        $('#dagency').val(data[0].d_agency)
        $('#dsource').val(data[0].d_source)
        var groups = JSON.parse(data[0].d_groups)

        var arrGroups = []
        $('.label-container').children('input[type=checkbox]').each(function () {
            arrGroups.push($(this).val())
        })
        groups.map(i => {
            // console.log(i)
            // $(`.label-container input[type=checkbox][value=${i}]`).prop("checked", true);
            var check = arrGroups.includes(i);
            if (check == true) {
                $(`.label-container input[type=checkbox][value=${i}]`).prop("checked", true);
            } else {
                $(`.label-container input[type=checkbox][value=other]`).prop("checked", true);
                $('#Gother').val(i)
            }
        })
        if (data[0].d_type) {
            var arr = ['ข้อมูลระเบียน', 'ข้อมูลภูมิสารสนเทศเชิงพื้นที่']
            var check = arr.includes(data[0].d_type);
            if (check == true) {
                $(`input[name=DT_RadioOptions][value=${data[0].d_type}]`).prop("checked", true);
            } else {
                $(`input[name=DT_RadioOptions][value=other]`).prop("checked", true);
                $('#DT_other').val(i)
            }

            if (data[0].d_type == 'ข้อมูลภูมิสารสนเทศเชิงพื้นที่') {
                if (JSON.parse(data[0].d_meta)[0].type == "zip") {
                    // console.log(JSON.parse(data[0].d_meta)[0].type)
                    document.getElementById("mapp").innerHTML = `<div id="map"></div>`;
                    loadMap(data[0].d_id);
                    $(`#inputlink`).hide()
                }
                else if (JSON.parse(data[0].d_meta)[0].type == "URL", "API", "GD") {
                    console.log(JSON.parse(data[0].d_meta)[0].type)
                    $(`#inputfile`).hide()
                }
                else {
                    $(`#inputlink`).hide()
                }
            }
            if (data[0].d_type == 'ข้อมูลระเบียน') {
                var aa = JSON.parse(data[0].d_meta)[0].type
                // console.log(aa)
                if (aa == "URL" || aa == "API" || aa == "GD") {
                    $(`#inputfile`).hide()
                }
                else {
                    $(`#inputlink`).hide()
                }
            }


        }


        // if (data[0].d_bound) {
        //     $('#dbound').prop('disabled', false)
        //     var bound = ['ระดับประเทศ', 'ระดับจังหวัด', 'ระดับอำเภอ', 'ระดับตำบล', 'ไม่มี']
        //     bound.map(i => {
        //         var check = bound.includes(i);
        //         if (check == true) {
        //             $('#dbound').val(data[0].d_bound)
        //         }
        //         else {
        //             $('#dbound').val('other').change()
        //             $('#geo_other').val(data[0].d_bound)
        //         }
        //     })
        // }

        var keywords = JSON.parse(data[0].d_keywords)
        keywords.map((i, index) => {
            var content = $(`
            <div class="keyword mr-1" id="key${index}" value="${i}">
                <h2>${i}</h2>
                <button type="button" class="close" aria-label="Close" onclick="removekey('key${index}')">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>`)
            $(`#addkeyword`).append(content)
        })


        genFiles(data[0].d_datafiles)
    })
}
let valFiles;
let genFiles = async (data, type, time) => {
    var json = JSON.parse(data)
    // console.log(json)
    var Files = json[0].Files
    if (Files) {
        $('input[datafile_type=file]').prop('checked', 'true').change()
        valFiles = Files.length
        Files.map((i, index) => {
            var content_deplay = $(`
                <div class="d-flex justify-content-between w-100 p-2" id="file_${index + 1}">${index + 1}. ${i.filename}
                    <button type="button" class="btn btn-danger"
                        onclick="deleteFile('file_${index + 1}', 'datafile${index + 1}')">ลบ</button>
                </div>`)
            $(`#deplay-file`).append(content_deplay)
            var content_data = $(
                `<input type="hidden" id="datafile${index + 1}_file" name="data-files" value="">
                <input type="hidden" id="datafile${index + 1}_name" name="data-name" value="">
                <input type="hidden" id="datafile${index + 1}_date" name="data-date" value="">`)
            $(`#listdata-file`).append(content_data)

            $(`#datafile${index + 1}_file`).val(i.file);
            $(`#datafile${index + 1}_name`).val(i.filename);
            $(`#datafile${index + 1}_date`).val(i.date);

        })
    }
    //////////////
    var Url = json[0].Links
    if (Url) {
        $('input[datafile_type=link]').prop('checked', 'true').change()
        await Url.map((i, index) => {
            if (index == 0) {
                $(`#linktype_0`).val(i.type)
                $(`#linkname_0`).val(i.name)
                $(`#linkurl_0`).val(i.link)
            } else {
                var content = $(`
                <div class="form-inline w-100">
                <div class="col-2 form-group p-0 mb-2 w-100">
                <label class="sr-only">ประเภท</label>
                <select class="custom-select m-auto w-100" name="linktype" id="linktype_${index}">
                    <option hidden>เลือก...</option>
                    <option value="URL">URL</option>
                    <option value="API">API</option>
                    <option value="GD">Google drive</option>
                </select>
                </div>
                <div class="col-10">
                <div class="row">
                    <div class="col-lg-6 col-sm-12 form-group p-0 mb-2">
                        <input type="text" name="linkname" class="form-control ml-4 w-100" id="linkname_${index}" placeholder="name" required>
                    </div>
                    <div class="col-lg-6 col-sm-12 form-group p-0 mb-2">
                        <input type="text" name="link" class="form-control ml-4 w-100" id="linkurl_${index}" placeholder="link" required>
                    </div>
                </div>
            </div>
                    </div>`).hide().fadeIn(1000);
                $('#listlink-file').append(content)
                $(`#linktype_${index}`).val(i.type)
                $(`#linkname_${index}`).val(i.name)
                $(`#linkurl_${index}`).val(i.link)
            }
        })
    }
}

$('#input-fcount-1').fileinput({
    // uploadUrl: "/site/upload-file-chunks",
    enableResumableUpload: true,
    initialPreviewAsData: true,
    maxFileCount: 9,
    theme: 'fa5',
    // deleteUrl: '/site/file-delete',
    uploadExtraData: {
        uploadToken: "SOME_VALID_TOKEN"
    },
    overwriteInitial: false,
    validateInitialCount: true,
    showUpload: false,
    showCancel: false,
    browseLabel: "Pick Files",
    browseIcon: "<i class=\"bi-file-earmark-fill\"></i> ",
    allowedFileExtensions: ["doc", "docx", "xls", "xlsx", "csv", "ppt", "pptx", "jpg", "jpeg", "pdf", "zip", "rar"],
    // input-file ["doc", "xls", "ppt", "jpg", "pdf", "zip",],

    preferIconicPreview: true,
    previewFileIconSettings: { // configure your icon file extensions
        'doc': '<i class="fas fa-file-word text-primary"></i>',
        'xls': '<i class="fas fa-file-excel text-success"></i>',
        'ppt': '<i class="fas fa-file-powerpoint text-danger"></i>',
        'pdf': '<i class="fas fa-file-pdf text-danger"></i>',
        'zip': '<i class="fas fa-file-archive text-muted"></i>',
        'rar': '<i class="fas fa-file-archive text-muted"></i>',
        'htm': '<i class="fas fa-file-code text-info"></i>',
        'txt': '<i class="fas fa-file-alt text-info"></i>',
        'mov': '<i class="fas fa-file-video text-warning"></i>',
        'mp3': '<i class="fas fa-file-audio text-warning"></i>',
        // note for these file types below no extension determination logic 
        // has been configured (the keys itself will be used as extensions)
        'jpg': '<i class="fas fa-file-image text-danger"></i>',
        'gif': '<i class="fas fa-file-image text-muted"></i>',
        'png': '<i class="fas fa-file-image text-primary"></i>'
    },
    previewFileExtSettings: { // configure the logic for determining icon file extensions
        'doc': function (ext) {
            return ext.match(/(doc|docx)$/i);
        },
        'xls': function (ext) {
            return ext.match(/(xls|xlsx)$/i);
        },
        'ppt': function (ext) {
            return ext.match(/(ppt|pptx)$/i);
        },
        'zip': function (ext) {
            return ext.match(/(zip|rar|tar|gzip|gz|7z)$/i);
        },
        'htm': function (ext) {
            return ext.match(/(htm|html)$/i);
        },
        'txt': function (ext) {
            return ext.match(/(txt|ini|csv|java|php|js|css)$/i);
        },
        'mov': function (ext) {
            return ext.match(/(avi|mpg|mkv|mov|mp4|3gp|webm|wmv)$/i);
        },
        'mp3': function (ext) {
            return ext.match(/(mp3|wav)$/i);
        }
    }
}).on('fileloaded', function (event, file, previewId, fileId, index, reader) {
    // console.log("fileloaded", index, fileId);

    var maxsize = file.size >= 14680064;
    if (maxsize) {
        $(`#warningsize`).show()
        $(`#disbtn`).show()
        $(`#btn-add-file`).hide()

    }
    else {
        $(`#warningsize`).hide()
        $(`#btn-add-file`).show()
        $(`#disbtn`).hide()
    }

    var index_id = valFiles + (index + 1)
    var content_deplay = $(`
    <div class="d-flex justify-content-between w-100 p-2 dataNew" id="file_${index_id}">${index_id}. ${file.name}
        <button type="button" class="btn btn-danger"
            onclick="deleteFile('file_${index_id}', 'datafile${index_id}')">ลบ</button>
    </div>`)
    $(`#deplay-file`).append(content_deplay)
    var c = `<input type="hidden" id="datafile${index_id}_file" name="data-files" value="" data="New">
            <input type="hidden" id="datafile${index_id}_name" name="data-name" value="" data="New">
            <input type="hidden" id="datafile${index_id}_date" name="data-date" value="" data="New">`
    $(`#listdata-file`).append(c)

    var reader = new FileReader();
    reader.onloadend = (e) => {
        let Original = reader.result;
        $(`#datafile${index_id}_file`).val(reader.result);
        $(`#datafile${index_id}_name`).val(file.name);
        $(`#datafile${index_id}_date`).val(Date.now());
    }
    reader.readAsDataURL(file);
}).on('fileclear', function (event, index) {
    $('.dataNew').remove();
    $('input[type=hidden][data=New]').remove();
})
let deleteFile = (deplayid, dataid) => {
    $('#' + deplayid).remove();
    $(`#${dataid}_file`).remove();
    $(`#${dataid}_name`).remove();
    $(`#${dataid}_date`).remove();

    // $('')
}
$('#btn-upload').click(function () {
    $("#modaluploadFiles").modal("toggle");
})
$('#btn-add-file').click(function () {
    $("#modaluploadFiles").modal("hide");
})
$('#btn-close-modal').click(function () {
    $("#modaluploadFiles").modal("hide");
    $('#input-fcount-1').fileinput('clear');
    $('#input-fcount-1').fileinput('reset');
    // $('#input-fcount-1').fileinput('refresh');
})

$(`#warningsize`).hide()
$(`#disbtn`).hide()

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

let conTypeFile = (type) => {
    var sp = type.split("/")
    if (sp[1] == "pdf") {
        return '<i class="fas fa-file-pdf text-danger"></i>'
    } else if (sp[1] == 'jpeg' || sp[1] == 'jpg') { return '<i class="fas fa-file-image text-danger"></i>' }
    else if (sp[1] == 'png') { return '<i class="fas fa-file-image text-primary"></i>' }
    else if (sp[1] == 'gif') { return '<i class="fas fa-file-image text-muted"></i>' }
    else if (sp[1] == 'doc' || sp[1] == 'msword') { return '<i class="fas fa-file-word text-primary"></i>' }
    else if (sp[1] == 'xls' || sp[1] == 'xlsx' || sp[1] == 'vnd.ms-excel') { return '<i class="fas fa-file-excel text-success"></i>' }
    else if (sp[1] == 'ppt') { return '<i class="fas fa-file-powerpoint text-danger"></i>' }
    else { return '<i class="fas fa-file text-secondary"></i>' }
}

$('#btn-keyword').click(async function () {
    var keyword = $('#keyword').val();
    var score = $("#addkeyword").children(".keyword").length;
    if (keyword) {
        var content = $(`
        <div class="keyword mr-1" id="key${score + 1}" value="${keyword}">
            <h2>${keyword}</h2>
            <button type="button" class="close" aria-label="Close" onclick="removekey('key${score + 1}')">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>`).hide().fadeIn(1000);
        $("#addkeyword").append(content)
        $('#keyword').val('')
    }
})
let removekey = (target) => {
    $('#' + target).empty()
}
let SH_other = (target) => {
    $(target).children("input[type=checkbox]").each(function () {
        if ($(this).is(":checked")) {
            // console.log("checked")
            $(`#Gother`).hide().fadeIn(1000).prop('required', 'true');
        } else {
            $(`#Gother`).hide().removeAttr('required');
        }
    });
}

$('input[name=DT_RadioOptions]').on('change', function () {
    if ($(this).is(":checked")) {
        if ($(this).val() == 'other') {
            $('#dbound').prop('disabled', 'true').val($("#dbound option:hidden").val());
            $(`#DT_other`).hide().fadeIn(1000).prop('required', 'true');
        } else if ($(this).val() == 'ข้อมูลระเบียน') {
            $('#dbound').prop('disabled', 'true').val($("#dbound option:hidden").val());
            $(`#DT_other`).hide().removeAttr('required');
        } else if ($(this).val() == 'ข้อมูลภูมิสารสนเทศเชิงพื้นที่') {
            $('#dbound').removeAttr('disabled');
            $(`#DT_other`).hide().removeAttr('required');
        }
    }
})

$('#dbound').on('change', function () {
    if ($(this).val() == 'other') {
        $(`#geo_other`).hide().fadeIn(1000).prop('required', 'true');
    } else {
        $(`#geo_other`).hide().removeAttr('required');
    }
})

let inputFile = (target, type) => {
    $(target).children("input[type=radio]").each(function () {
        var datafile_type = $(this).attr("datafile_type");
        if ($(this).is(":checked")) {
            // console.log("checked")
            $(`#${type}upload`).hide().fadeIn(1000).prop('required', 'true');
            if (datafile_type == 'link') {
                var content = $(`
                <div class="form-inline w-100">
                    <div class="col-2 form-group p-0 mb-2 w-100">
                        <label class="sr-only">ประเภท</label>
                        <select class="custom-select m-auto w-100" name="linktype" id="linktype_0">
                            <option hidden>เลือก...</option>
                            <option value="URL">URL</option>
                            <option value="API">API</option>
                            <option value="GD">Google drive</option>
                        </select>
                    </div>
                    <div class="col-10">
                        <div class="row">
                            <div class="col-lg-6 col-sm-12 form-group p-0 mb-2">
                                <input type="text" name="linkname" class="form-control ml-4 w-100" id="linkname_0" placeholder="name" required>
                            </div>
                            <div class="col-lg-6 col-sm-12 form-group p-0 mb-2">
                                <input type="text" name="link" class="form-control ml-4 w-100" id="linkurl_0" placeholder="link" required>
                            </div>
                        </div>
                    </div>
                </div>`).hide().fadeIn(1000);
                $('#listlink-file').append(content)
                $(`#fileupload`).hide()
            }
            else if (datafile_type == 'file') {
                $(`#linkupload`).hide()
                // $(`#linkupload`).show()
            }
        } else {
            $(`#${type}upload`).hide().removeAttr('required');
            if (datafile_type == 'link') {
                $('#listlink-file').empty();
            }
        }
    });
    // console.log($(target).children("input[type=checkbox]:checked"))
}
$(`#Gother`).hide()
$(`#geo_other`).hide()
$(`#DT_other`).hide()
// $(`#linkupload`).hide()



let add_link = () => {
    var n = $("#listlink-file").children(".form-inline").length
    var content = $(`
    <div class="form-inline w-100">
        <div class="col-2 form-group p-0 mb-2 w-100">
        <label class="sr-only">ประเภท</label>
        <select class="custom-select m-auto w-100" name="linktype" id="linktype_${n}">
            <option hidden>เลือก...</option>
            <option value="URL">URL</option>
            <option value="API">API</option>
            <option value="GD">Google drive</option>
        </select>
        </div>
        <div class="col-10">
            <div class="row">
                <div class="col-lg-6 col-sm-12 form-group p-0 mb-2">
                    <input type="text" name="linkname" class="form-control ml-4 w-100" id="linkname_${n}" placeholder="name" required>
                </div>
                <div class="col-lg-6 col-sm-12 form-group p-0 mb-2">
                    <input type="text" name="link" class="form-control ml-4 w-100" id="linkurl_${n}" placeholder="link" required>
                </div>
            </div>
        </div>
    </div>`).hide().fadeIn(1000);
    $('#listlink-file').append(content)
}

let delete_link = () => {
    $("#listlink-file").children(".form-inline").last().remove();
}

let pass = n => [...crypto.getRandomValues(new Uint8Array(n))]
    .map((x, i) => (i = x / 255 * 61 | 0, String.fromCharCode(i + (i > 9 ? i > 35 ? 61 : 55 : 48)))).join``
let createid = () => {
    var n = pass(32);
    var d_id = n.slice(0, 8) + '-' + n.slice(8, 12) + '-' + n.slice(12, 16) + '-' + n.slice(16, 20) + '-' + n.slice(20, 32);
    return d_id
}

let senddata = async () => {

    var obj_groups = [];
    var obj_keywords = [];
    var obj_datafiles = {};

    // await $("#pre_form").children(".form-group").each(async function (e, i) { })
    await $(".label-container").children("input[type=checkbox]:checked").each(async function (e, i) {
        var value = $(this).attr("value");
        if (value !== 'other') {
            obj_groups.push(value)
        } else {
            var other = $('#Gother').val()
            obj_groups.push(other)
        }
    })
    await $(".form-check").children("input[type=radio]:checked").each(async function (e, i) {
        var datafile_type = $(this).attr("datafile_type");
        if (datafile_type) {
            if (datafile_type == 'file') {
                var files = [];
                var name = [];
                var types = [];
                var date = [];
                var arrFiles = [];

                $(`#listdata-file`).children("input[name=data-files]").each(function (e) {
                    files.push($(this).val());
                });
                $(`#listdata-file`).children("input[name=data-date]").each(function (e) {
                    date.push($(this).val());
                });
                $(`#listdata-file`).children("input[name=data-name]").each(function (e) {
                    var type = $(this).val().split(".")

                    name.push($(this).val());
                    types.push(type[1]);
                });

                name.map((d, index) => {
                    var date = Date.now()
                    arrFiles.push({ filename: d, type: types[index], file: files[index], date: date[index] })
                })
                // console.log(arrFiles)
                if (arrFiles.length > 0) {
                    obj_datafiles['Files'] = arrFiles
                }
            } else if (datafile_type == 'link') {
                var arrLinks = [];
                var n = $('#listlink-file').children(".form-inline").length
                // $('#listlink-file').children(".form-inline").each(function (e, index) {
                for (var i = 0; i < n; i++) {
                    var type = $('#linktype_' + i).val()
                    var link = $('#linkurl_' + i).val()
                    var linkname = $('#linkname_' + i).val()
                    var date = Date.now()
                    arrLinks.push({ name: linkname, type: type, link: link, date: date })
                }
                // console.log(arrLinks)
                if (arrLinks.length > 0) {
                    obj_datafiles['Links'] = arrLinks
                }
            }
        }
    })
    await $("#addkeyword").children(".keyword").each(async function (e, i) {
        var value = $(this).attr("value");
        obj_keywords.push(value)
    })
    var dtype;
    await $('input[name=DT_RadioOptions]').each(function () {
        if ($(this).is(":checked") && $(this).val() !== 'other') {
            dtype = $(this).val();
        } else if ($(this).is(":checked") && $(this).val() == 'other') {
            dtype = $('#DT_other').val();
        }
    })
    // var m2 = $('#dmeta').val()
    // var bound 
    // var meta = new Date().toLocaleDateString('th-TH')

    var check_data = isEmptyObject(obj_datafiles)

    const formDataObj = {
        d_id: d_id,
        d_name: $('#dname').val(),
        d_agency: $('#dagency').val(),
        d_detail: $('#ddetail').val(),
        d_groups: obj_groups.length > 0 ? JSON.stringify(obj_groups) : "",
        d_type: dtype,
        d_bound: $('#dbound').val() !== 'other' ? $('#dbound').val() !== 'เลือก...' ? $('#dbound').val() : "" : $("#geo_other").val(),
        d_keywords: obj_keywords.length > 0 ? JSON.stringify(obj_keywords) : "",
        // d_tmeta: meta,
        // d_tnow: Date.now(),
        d_source: $('#dsource').val(),
        d_datafiles: check_data == true ? JSON.stringify([obj_datafiles]) : "",
        d_username: firstname_TH,
        d_iduser: cmuitaccount,
        d_access: auth
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
                await axios.post(`/ds-api/update`, { data: formDataObj }).then(r => {
                    var Sucss = r.data.data;
                    if (Sucss == 'Update data') {
                        Swal.fire({
                            icon: 'success',
                            title: 'แก้ไขข้อมูลสำเร็จ',
                            customClass: {
                                container: 'ff-noto',
                                title: 'ff-noto',
                            },
                        }).then((result) => {
                            if (result.isConfirmed) {
                                sessionStorage.removeItem(d_id);
                                window.location.href = './../manage/index.html';
                            }
                        })
                        $("#forminput").removeClass('was-validated');
                    }
                    // console.log(Sucss)
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

function isEmptyObject(obj) {
    for (const key in obj) {
        if (Object.hasOwn(obj, key)) {
            return true;
        }
    }
    return false;
}

$('#btn-send').click(function () {
    senddata()
})

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

$(document).ready(function () {
    load_data(d_id)
})