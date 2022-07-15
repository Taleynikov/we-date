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
});

function callThisShit() {
    weMeet();
    weDate();
    weMarried();
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