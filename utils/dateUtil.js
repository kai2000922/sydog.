function week(day) {
	const weeks = new Array("周日", "周一", "周二", "周三", "周四", "周五", "周六");
	return weeks[day]
}

function getDaysOfMonth(year, month) {
	let date = new Date(year, month, 0);
	let days = date.getDate();
	return days;
}

function getDistance(today, date) {
	
}

function getDate(time) {
	let today = new Date()

	var arr = time.split(/[- :]/)
	let date = new Date(arr[0], arr[1] - 1, arr[2], arr[3], arr[4], arr[5]);

	return {
		isToday: date.getFullYear() === today.getFullYear() && date.getMonth() === today.getMonth() && date.getDate() === today.getDate(),
		distance: parseInt(Math.abs((date - today) / (1000 * 60 * 60 * 24))),
		month: date.getMonth() + 1,
		day: date.getDate(),
		week: week(date.getDay()),
		startHour: date.getHours(),
		endHour: date.getHours() + 2
	}
}

export {
	getDate
}
