//離開焦點時觸發
var tall = document.getElementById('tall');
var weight = document.getElementById('weight');
tall.addEventListener('blur', checkContent, false);
weight.addEventListener('blur', checkContent, false);
function checkContent(e) {
    var str = e.target.value;
    if (str == '') {
        alert('請填寫您的正確體重和身高');

    }
}
//建立DOM
var list = document.querySelector('.list');
var sendData = document.querySelector('.btnr');
var clearData = document.querySelector('.clearhistory');
var listli = document.querySelector('.listli');
var data = JSON.parse(localStorage.getItem('listData')) || [];
//先載入歷史紀錄內容
updateList(data);
//建立監聽
sendData.addEventListener('click', BMIData, false);
clearData.addEventListener('click', deleteData, false);
//BMI計算
function BMIData(e) {
    e.preventDefault();
    var t = tall.value;
    var w = weight.value;
    var m = t / 100;
    var BMI = (w / (m * m)).toFixed(2); //toFixed(?)  ?=0~20 四捨五入小數點
    if (BMI == 'NaN') {
        alert('請輸入正確的數值');
        return;
    } else if (t == '') {
        alert('您尚未輸入身高！');
        return;
    } else if (w == '') {
        alert('您尚未輸入體重！');
        return;
    } else if (w > 1000 || w <= 0) {
        alert('請您輸入正確體重！')
        return;
    } else if (t > 300 || t <= 0) {
        alert('請您輸入正確身高！')
        return;
    };
    status = ''
    if (BMI >= 40) {
        status = '重度肥胖'
        lightBar = 'red';
    } else if (BMI >= 35) {
        status = '中度肥胖';
        lightBar = 'orange2';
    } else if (BMI >= 30) {
        status = '輕度肥胖';
        lightBar = 'orange2';
    } else if (BMI >= 25) {
        status = '過重';
        lightBar = 'orange1';
    } else if (BMI >= 18.5) {
        status = '理想';
        lightBar = 'green';
    } else {
        status = '過輕';
        lightBar = 'blue';
    };
    var NowDate = new Date();
    var todo = {
        tall: t,
        weight: w,
        BMI: BMI,
        status: status,
        lightBar: lightBar,
        //計算時間
        time: NowDate.toDateString(),
    };
    data.push(todo);
    localStorage.setItem('listData', JSON.stringify(data));
    updateList(data);
};
function updateList(data) {
    str = '';
    var len = data.length;
    //變數 = 初始值 ; 變數 < 限制值 ; 變數 + 步進值
    for (i=(len-1);i>=0;i--) {
        str += '<li class="listli ' + data[i].lightBar + '"><div class="listlidiv"><p>' + data[i].status + '</p><p>BMI：' + data[i].BMI + '</p><p>身高：' + data[i].tall + '</p><p>體重：' + data[i].weight + '</p><p>' + data[i].time + '</p></div><li>'
    }
    list.innerHTML = str;

}
function deleteData(e) {
    e.preventDefault();
    localStorage.removeItem('listData');
    data = [];
    updateList(data);
}