/**
 * Returns a date string in the format YYYY-MM-DD
 * @param {Date} dateObj
 * @returns {string}
 */
export default function createDateElDateString(dateObj) {
	let yyyy = dateObj.getFullYear();
	let mm = `${dateObj.getMonth() + 1}`;
	let dd = `${dateObj.getDate()}`;

	if (parseInt(mm, 10) < 10) {
		mm = "0" + mm;
	}

	if (parseInt(dd, 10) < 10) {
		dd = "0" + dd;
	}

	return `${yyyy}-${mm}-${dd}`;
}
