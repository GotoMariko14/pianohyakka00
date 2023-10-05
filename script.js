

var unit = 100,
    canvasList,
    info = {},
    colorList;

function init() {
    info.seconds = 0;
    info.t = 0;
    canvasList = [];
    colorList = [];

    // canvas1個めの色指定
    canvasList.push(document.getElementById("waveCanvas"));
    colorList.push(['#0ff', '#ff0', '#f00', '#00f', '#f0f']);

    // 各キャンバスの初期化
    for (var canvasIndex in canvasList) {
        var canvas = canvasList[canvasIndex];
        canvas.width = document.documentElement.clientWidth;
        canvas.height = 200;
        canvas.contextCache = canvas.getContext("2d");
    }

    // 共通の更新処理呼び出し
    update();
}

function update() {
    for (var canvasIndex in canvasList) {
        var canvas = canvasList[canvasIndex];
        // 最初の波だけ描画
        if (canvasIndex == 0) {
            draw(canvas, colorList[canvasIndex]);
        }
    }
    // 共通の描画情報の更新
    info.seconds = info.seconds + .014;
    info.t = info.seconds * Math.PI;
    // 自身の再起呼び出し
    setTimeout(update, 100); // 呼び出し間隔を100ミリ秒に変更
}

function draw(canvas, colors) {
    var context = canvas.contextCache;
    context.clearRect(0, 0, canvas.width, canvas.height);

    for (var i = 0; i < colors.length; i++) {
        drawWave(canvas, colors[i], 0.3, 3, i * 20); // alphaを0.3に設定して色を薄くする
    }
}

function drawWave(canvas, color, alpha, zoom, delay) {
    var context = canvas.contextCache;
    context.strokeStyle = color;
    context.lineWidth = 1;
    context.globalAlpha = alpha; // alphaを設定して色を薄くする
    context.beginPath();
    drawSine(canvas, info.t / 0.5, zoom, delay);
    context.stroke();
}

function drawSine(canvas, t, zoom, delay) {
    var xAxis = Math.floor(canvas.height / 2);
    var yAxis = 0;
    var context = canvas.contextCache;
    var x = t;
    var y = Math.sin(x) / zoom;
    context.moveTo(yAxis, unit * y + xAxis);

    for (var i = yAxis; i <= canvas.width + 10; i += 10) {
        x = t + (-yAxis + i) / unit / zoom;
        y = Math.sin(x - delay) / 3;
        context.lineTo(i, unit * y + xAxis);
    }
}

init();

// スクロール時に実行される関数
window.onscroll = function () {
    var float_btn = document.getElementById("float_btn");
    var scrollPos = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
    var windowWidth = window.innerWidth;

    // スクロール位置が500px以上、かつ画面幅が501px以上の場合に表示
    if (scrollPos > 500 && windowWidth >= 501) {
        float_btn.style.right = "0px"; // 20px に変更
    } else {
        float_btn.style.right = "-100px"; // 画面外に隠す
    }
};

<!-- スムーススクロール -->

document.addEventListener('DOMContentLoaded', function () {
    var links = document.querySelectorAll('a.to_top01[href^="#"]');

    for (var i = 0; i < links.length; i++) {
        links[i].addEventListener('click', function (e) {
            e.preventDefault();

            var targetId = this.getAttribute('href').substring(1);
            var targetElement = document.getElementById(targetId);

            if (targetElement) {
                var offset = targetElement.getBoundingClientRect().top + window.scrollY;

                window.scrollTo({
                    top: offset,
                    behavior: 'smooth' // スムーズスクロールを有効にする
                });
            }
        });
    }
});

const floatBtn = document.getElementById('float_btn_sp');
const tenpo = document.getElementById('tenpo');

window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY;
    const windowWidth = window.innerWidth;

    // スクロール位置が300pxを超え、画面幅が500px以下の場合に表示
    if (scrollPosition > 300 && windowWidth <= 500) {
        floatBtn.style.bottom = '0px'; // 20px に変更
    } else {
        floatBtn.style.bottom = '-100px'; // 非表示に戻す
    }

    // #tenpo にスクロールしたら非表示にする場合
    const tenpoPosition = tenpo.getBoundingClientRect().top;
    if (tenpoPosition <= 0 || windowWidth > 500) {
        floatBtn.style.bottom = '-100px'; // 非表示にする
    }
});


function animateElements() {
    const elements = document.querySelectorAll('.animate-on-scroll');

    elements.forEach((element, index) => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenHeight = window.innerHeight;

        if (elementPosition < screenHeight) {
            // インデックスに応じた遅延を追加
            setTimeout(() => {
                element.classList.add('fadeIn');
            }, index * 200); // 200ミリ秒ごとに表示
        }
    });
}

window.addEventListener('scroll', animateElements);
window.addEventListener('load', animateElements);
