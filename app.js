const day = document.querySelector('#day');
const month = document.querySelector('#month');
const year = document.querySelector('#year');
const daytotal = document.querySelector('.daytotal');
const monthtotal = document.querySelector('.monthtotal');
const yeartotal = document.querySelector('.yeartotal');
const form = document.querySelector('#form');
const warning = document.querySelectorAll('#warning');
const box = document.querySelectorAll('.box');

function getDateDifference(endDay, endMonth, endYear) {
    // Convert the end date to a Date object
    var endDate = new Date(endYear, endMonth - 1, endDay); // Month is zero-based

    // Convert the current date to a Date object
    var currentDate = new Date();

    // Calculate the difference in milliseconds
    var diff = Math.abs(currentDate - endDate);

    // Calculate the number of milliseconds in a year, month, and day
    var millisecondsPerYear = 1000 * 60 * 60 * 24 * 365.25;
    var millisecondsPerMonth = millisecondsPerYear / 12;
    var millisecondsPerDay = 1000 * 60 * 60 * 24;

    // Calculate the number of years, months, and days
    var years = Math.floor(diff / millisecondsPerYear);
    var months = Math.floor((diff % millisecondsPerYear) / millisecondsPerMonth);
    var days = Math.floor(((diff % millisecondsPerYear) % millisecondsPerMonth) / millisecondsPerDay);

    // Return the result as an object
    return {
        years: years,
        months: months,
        days: days
    };
}

form.addEventListener('change', () => {
    if (day.value === '' || month.value === '' || year.value === '') {
        warning.forEach((e, index) => {
            yeartotal.textContent = `--`;
            monthtotal.textContent = `--`;
            daytotal.textContent = `--`;
            e.style.display = 'block';
            e.textContent = `Must be a valid ${e.getAttribute('data-field')}`;
            box[index].style.border = '1px solid hsl(0, 100%, 67%)';
        });
    } else if (day.value > '30' || month.value > '12' || year.value > `${new Date().getFullYear()}`) {
        warning.forEach((e, index) => {
            yeartotal.textContent = `--`;
            monthtotal.textContent = `--`;
            daytotal.textContent = `--`;
            e.style.display = 'block';
            e.textContent = `Must be a valid ${e.classList}`;
            box[index].style.border = '1px solid hsl(0, 100%, 67%)';
        });
    }
    else {
        warning.forEach((e, index) => {
            e.style.display = 'none';
            box[index].style.border = '';
        });
        const date = getDateDifference(day.value, month.value, year.value);
        yeartotal.textContent = date.years;
        monthtotal.textContent = date.months;
        daytotal.textContent = date.days;
    }
});
