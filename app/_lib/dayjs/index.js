import dayjs from "dayjs";
import devhelper from "dayjs/plugin/devHelper";
import utc from "dayjs/plugin/utc";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(devhelper);
dayjs.extend(utc);
dayjs.extend(customParseFormat);

/**
 *
 * @param {string|Date} [dateObj]
 * @param {string} [customFormatString]
 * @returns {dayjs.Dayjs}
 */
export function getDayjsDate(dateObj, customFormatString) {
	if (dateObj === undefined) {
		return dayjs();
	}

	if (typeof dateObj === "string" && customFormatString?.length) {
		return dayjs(dateObj, customFormatString);
	}

	return dayjs(dateObj);
}

/**
 *
 * @param {Date} dateObj
 * @param {boolean} [with24Hours]
 * @returns {string}
 */
export function getTimeFromDate(dateObj, with24Hours) {
	if (with24Hours) {
		return dayjs(dateObj).format("HH:mm");
	}
	return dayjs(dateObj).format("hh:mm A");
}
