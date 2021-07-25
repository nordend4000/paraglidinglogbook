import { getYear, isBefore, isAfter } from "date-fns"

export function getTotalTime(list, profileList) {
	let totalTime = 0
	if (profileList.length > 0) {
		totalTime = profileList[0].totalHours || 0
	}
	list.map(flight => (totalTime = totalTime + flight.duration / 60))
	return totalTime.toFixed(2)
}
export function getYearFlight(list) {
	const firstDay = new Date(`1 JANUARY ${getYear(new Date())}`)
	return list.filter(
		flight => isBefore(new Date(flight.date), firstDay) === false,
	)
}
export function getYearBeforeFlight(list) {
	const firstDay = new Date(`1 JANUARY ${getYear(new Date()) - 1}`)
	const lastDay = new Date(`31 DECEMBER ${getYear(new Date()) - 1}`)
	return list.filter(
		flight =>
			isBefore(new Date(flight.date), firstDay) === false &&
			isAfter(new Date(flight.date), lastDay) === false,
	)
}
/*
export function getTotalNumber(list, profileList) {
	let totalNumber = 0
	if (profileList.length > 0) {
		totalNumber = profileList[0].flightNumber || 0
	}
	const lastFlightNumber = getHigherNumber(list)
	return (totalNumber = totalNumber + lastFlightNumber)
}
*/
export function getHigherNumber(list) {
	return list.reduce(
		(acc, shot) => (acc = acc > shot.number ? acc : shot.number),
		0,
	)
}
export function getHigherDistance(list) {
	return list.reduce(
		(acc, shot) => (acc = acc > shot.distance ? acc : shot.distance),
		0,
	)
}
export function getHigherAltitude(list) {
	return list.reduce(
		(acc, shot) => (acc = acc > shot.altitude ? acc : shot.altitude),
		0,
	)
}
export function getHigherDuration(list) {
	return list.reduce(
		(acc, shot) => (acc = acc > shot.duration ? acc : shot.duration),
		0,
	)
}
export function getArrayOfGlider(array) {
	let arrayOfGlider = []
	array.map(glider => arrayOfGlider.push(glider.glider))
	return arrayOfGlider
}
export function getGliderFlightTime(selectedGlider, gliderList, list) {
	const filteredGliderList = gliderList.filter(
		glider => glider.glider === selectedGlider,
	)
	const initialTime = parseInt(filteredGliderList[0].hours)
	let totalFlightTime = 0
	const filteredList = list.filter(
		glider => glider.selectedGlider === selectedGlider,
	)
	filteredList.map(element => {
		return (totalFlightTime = totalFlightTime + element.duration)
	})
	return (totalFlightTime / 60 + initialTime).toFixed(2)
}
export function formatTime(time) {
	const h = Math.floor(time)
	const min = parseInt(((time - h) * 60).toFixed(0))
	if (h === 0) return `${min} min`
	if (min === 0) return `${h} h`
	return `${h} h ${min} min`
}
export function getSpotsNumber(list, profileList) {
	const beforeSpots = profileList.spotNumber
}
