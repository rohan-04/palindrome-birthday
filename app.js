const birthDate = document.querySelector('#birth-date');
const checkButton = document.querySelector('#check-btn');
const output = document.querySelector('#output');
const gifContainer = document.querySelector('.disable');

function getDateObject(birthDate) {
	const dateObject = {};
	const date = birthDate.value.split('-');
	date.reverse();
	dateObject.day = date[0];
	dateObject.month = date[1];
	dateObject.year = date[2];

	return dateObject;
}

function getAllDateFormat(dateobj) {
	let ddmmyyyy = dateobj.day + dateobj.month + dateobj.year;
	let mmddyyyy = dateobj.month + dateobj.day + dateobj.year;
	let yyyymmdd = dateobj.year + dateobj.month + dateobj.day;
	let ddmmyy = dateobj.day + dateobj.month + dateobj.year.slice(-2);
	let yymmdd = dateobj.year.slice(-2) + dateobj.month + dateobj.day;

	return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, yymmdd];
}

function isPalindrome(date) {
	return date === date.split('').reverse().join('');
}

function checkPalindromeForAllDateFormats(dateObj) {
	const allDateFormats = getAllDateFormat(dateObj);
	for (let i = 0; i < allDateFormats.length; i++) {
		if (isPalindrome(allDateFormats[i])) {
			return true;
		}
	}
	return false;
}

function isLeapYear(year) {
	if (year % 400 === 0) {
		return true;
	}
	if (year % 100 === 0) {
		return false;
	}

	if (year % 4 === 0) {
		return true;
	}
	return false;
}

function getNextDate(date) {
	let day = Number(date.day) + 1;
	let month = Number(date.month);
	let year = Number(date.year);

	const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

	if (month === 2) {
		if (isLeapYear(year)) {
			if (day > 29) {
				day = 1;
				month++;
			}
		} else {
			if (day > 28) {
				day = 1;
				month++;
			}
		}
	} else {
		if (day > daysInMonth[month - 1]) {
			day = 1;
			month++;
		}
	}

	if (month > 12) {
		month = 1;
		year++;
	}

	if (day < 10) {
		day = '0' + day;
	}

	if (month < 10) {
		month = '0' + month;
	}

	return {
		day: day.toString(),
		month: month.toString(),
		year: year.toString(),
	};
}

function getNextPalindromeDate(date) {
	let counter = 0;
	let nextDate = getNextDate(date);
	while (true) {
		counter++;
		if (checkPalindromeForAllDateFormats(nextDate)) {
			break;
		}
		nextDate = getNextDate(nextDate);
	}

	console.log(counter, nextDate);
	return [counter, nextDate];
}

function checkDateIsPalindrome() {
	if (!birthDate.value) {
		output.innerText = 'Please enter the date correctly.';
	} else {
		gifContainer.style.display = 'block';
		output.innerText = '';
		setTimeout(() => {
			const dateObj = getDateObject(birthDate);

			if (checkPalindromeForAllDateFormats(dateObj)) {
				output.innerText = 'Yay 🥳, its Palindrome 🎉';
			} else {
				const [count, nextDate] = getNextPalindromeDate(dateObj);
				output.innerText =
					'You missed by ' +
					count +
					' days 🙁,next palindrome date is ' +
					nextDate.day +
					'-' +
					nextDate.month +
					'-' +
					nextDate.year;
			}
			gifContainer.style.display = 'none';
		}, 3000);
	}
}

checkButton.addEventListener('click', checkDateIsPalindrome);
