function week(day) {
	const weeks = new Array("周日", "周一", "周二", "周三", "周四", "周五", "周六");
	return weeks[day]
}

function  getDate(time) {
	let date = new Date(time)
	return {
		month: date.getMonth() + 1,
		day: date.getDate(),
		week: week(date.getDay()),
		startHour: date.getHours(),
		endHour: date.getHours() + 2
	}
}

export {getDate}