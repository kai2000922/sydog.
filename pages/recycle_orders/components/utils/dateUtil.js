function week(day) {
	const weeks = new Array("周日", "周一", "周二", "周三", "周四", "周五", "周六");
	return weeks[day]
}

function  getDate(time) {
	let today = new Date()
	// let date = new Date(time)
	
	var arr = time.split(/[- :]/)
	let date = new Date(arr[0], arr[1]-1, arr[2], arr[3], arr[4], arr[5]);
	
	console.log(date)
		
	return {
		isToday: date.getFullYear() === today.getFullYear() && date.getMonth() === today.getMonth() && date.getDate() === today.getDate() ? true : false,
		month: date.getMonth() + 1,
		day: date.getDate(),
		week: week(date.getDay()),
		startHour: date.getHours(),
		endHour: date.getHours() + 2
	}
}

export {getDate}