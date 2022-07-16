const DATE_FORMAT = 'DD-MM-YYYY';
const yearsDecl = ['год', 'года', 'лет'];
const monthsDecl = ['месяц', 'месяца', 'месяцев'];
const daysDecl = ['день', 'дня', 'дней'];
const hoursDecl = ['час', 'часа', 'часов'];
const minutesDecl = ['минута', 'минуты', 'минут'];
const secondsDecl = ['секунда', 'секунды', 'секунд'];

const slideColors = ['#173F5F', '#20639B', '#3CAEA3', '#F6D55C', '#ED553B'];
const textColors = ['#cfe4f5', '#09312e'];

$(document).ready(() => {
    const slider = $('.we-slider').slick({
        dots: true,
        infinite: true,
        speed: 200,
        slidesToShow: 1,
        arrows: false
    });

    $('body').css('background-color', slideColors[0]);
    $('body').css('color', textColors[0]);

    slider.on('beforeChange', function(event, slick, currentSlide, nextSlide) {
        $('body').css('background-color', slideColors[nextSlide]);

        if (nextSlide >= 0 && nextSlide <= 1) {
            $('body').css('color', textColors[0]);
        } else {
            $('body').css('color', textColors[1]);
        }
    });

    callThisShit();

    setInterval(() => {
        callThisShit();
    }, 1000);

    window.addEventListener('resize', () => {
        const isLandscape = screen.availWidth > screen.availHeight;

        if (isLandscape) {
            addSlides(slider);
        } else {
            removeSlides(slider);
        }
    });
});

function addSlides(slickSlider) {
    slickSlider.slick('slickAdd', '<div class="we-slider__slide"><img class="we-image" src="./assets/stickers/kiss.png" alt="мне лень"><div class="we-content"><div class="fw-900">мы поцеловались</div><div class="fw-900">31 декабря 2019</div><div class="divider-size">это</div><div class="weKissYears fw-900">n лет</div><div class="weKissMonths fw-700">n месяцев</div><div class="weKissDays fw-500">n дней</div><div class="weKissHours fw-400">n часов</div><div class="weKissMinutes fw-300">n минут</div><div class="weKissSeconds fw-300">n секунд</div></div></div>');
    slickSlider.slick('slickAdd', '<div class="we-slider__slide"><img class="we-image" src="./assets/stickers/fuck.png" alt="мне лень"><div class="we-content"><div class="fw-900">первый секс</div><div class="fw-900">2 января 2020</div><div class="divider-size">это</div><div class="weFuckYears fw-900">n лет</div><div class="weFuckMonths fw-700">n месяцев</div><div class="weFuckDays fw-500">n дней</div><div class="weFuckHours fw-400">n часов</div><div class="weFuckMinutes fw-300">n минут</div><div class="weFuckSeconds fw-300">n секунд</div></div></div>');
}

function removeSlides(slickSlider) {
    slickSlider.slick('slickRemove', 3);
    slickSlider.slick('slickRemove', 3);
}

function callThisShit() {
    weMeet();
    weDate();
    weMarried();
    weKiss();
    weFuck();
}

function weMeet() {
    calcDates('weMeet', '20-10-2019');
}

function weDate() {
    calcDates('weDate', '09-02-2020');
}

function weMarried() {
    calcDates('weMarried', '31-08-2021');
}

function weKiss() {
    calcDates('weKiss', '31-12-2019');
}

function weFuck() {
    calcDates('weFuck', '02-01-2020');
}

function calcDates(preSelector, fromDate) {
    const from = moment(fromDate, DATE_FORMAT);

    const years = dateNumber(from, 'years');
    const months = dateNumber(from, 'months');
    const days = dateNumber(from, 'days');
    const hours = dateNumber(from, 'hours');
    const minutes = dateNumber(from, 'minutes');
    const seconds = dateNumber(from, 'seconds');

    setText(`.${preSelector}Years`, years, yearsDecl);
    setText(`.${preSelector}Months`, months, monthsDecl);
    setText(`.${preSelector}Days`, days, daysDecl);
    setText(`.${preSelector}Hours`, hours, hoursDecl);
    setText(`.${preSelector}Minutes`, minutes, minutesDecl);
    setText(`.${preSelector}Seconds`, seconds, secondsDecl);
}

function dateNumber(fromDate, dateForm) {
    return moment().diff( moment(fromDate), dateForm);
}

function setText(selector, number, declination) {
    $(selector).text( `${number} ${getNoun(number, ...declination)}` );
}

function getNoun(number, one, two, five) {
    let n = Math.abs(number);

    n %= 100;

    if (n >= 5 && n <= 20) {
        return five;
    }

    n %= 10;

    if (n === 1) {
        return one;
    }

    if (n >= 2 && n <= 4) {
        return two;
    }

    return five;
}