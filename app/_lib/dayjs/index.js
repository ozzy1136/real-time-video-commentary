import dayjs from "dayjs";
import devhelper from "dayjs/plugin/devHelper";
import utc from "dayjs/plugin/utc";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(devhelper);
dayjs.extend(utc);
dayjs.extend(customParseFormat);

/**
 * @param {Object} [config]
 * @param {string|Date} [config.dateObj]
 * @param {string} [config.customStringFormat]
 * @param {boolean} [config.asUTC]
 * @returns {dayjs.Dayjs}
 */
export function getDayjsDate({ dateObj, customStringFormat, asUTC } = {}) {
	if (typeof dateObj === "string" && customStringFormat?.length) {
		if (asUTC) {
			return dayjs.utc(dateObj, customStringFormat);
		}
		return dayjs(dateObj, customStringFormat);
	} else if (dateObj) {
		if (asUTC) {
			return dayjs.utc(dateObj);
		}
		return dayjs(dateObj);
	}

	if (asUTC) {
		return dayjs.utc();
	}

	return dayjs();
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
