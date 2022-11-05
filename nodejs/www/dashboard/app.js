const urlapi = `http://localhost:3000/ds-api`



let gotodata = (txt) => {
    location.href = './../infordata/index.html?page=1&category=' + txt;
}

let numcategory = async (d) => {
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
        // console.log(i)
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

let load_data = () => {
    axios.get(urlapi + '/getdata').then(r => {
        var data = r.data.data;

        var arr = [];
        var category = [];
        var arrKeyword = [];
        var arrfileform = [];

        data.map(i => {
            arr.push(i)
            var group = JSON.parse(i.d_groups)
            group.map(e => category.push(e))

            var keyword = JSON.parse(i.d_keywords)
            keyword.map(e => arrKeyword.push(e))

            var fileform = JSON.parse(i.d_datafiles)
            var dta = fileform[0]
            arrfileform.push(dta)
        })
        numcategory(category)
    })
}

const datauser = {}

const gotoLogin = () => {
    let url = 'https://oauth.cmu.ac.th/v1/Authorize.aspx?response_type=code' +
        '&client_id=JDxvGSrJv9RbXrxGQAsj0x4wKtm3hedf2qw3Cr2s' +
        '&redirect_uri=http://localhost:3000/login/' +
        '&scope=cmuitaccount.basicinfo' +
        '&state=dashboard'

    window.location.href = url;
};

let logout = () => {
    localStorage.clear();
    window.location.href = './../dashboard/index.html'
}

$(window).on('load', function () {
    if ($('#preloader').length) {
        $('#preloader').delay(100).fadeOut('slow', function () {
            $(this).remove();
            load_data()
        });
    }
});
AOS.init();