/**
 * @param {Date} string
 * @returns {string}
 */
export default function getTimeFromDate(string) {
	return string.toISOString().slice(11, 16);
}
