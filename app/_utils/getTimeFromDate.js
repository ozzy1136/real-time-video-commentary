/**
 * @param {Date} string
 * @returns {string}
 */
export function getTimeFromDate(string) {
	return string.toISOString().slice(11, 16);
}
