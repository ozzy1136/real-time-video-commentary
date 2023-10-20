import { z } from "zod";

import { createDateElDateString } from "./createDateElementDate";
import { availablePartyTimeSchema } from "@lib/zod/schemas/index";

/**
 * @typedef {Array<z.infer<typeof availablePartyTimeSchema>>} AvailablePartiesTimes
 */

/**
 * @param {string} partyDateString
 * @param {Array<string>} existingPartiesTimes Result of calling toString on Dates for existing parties start time
 * @returns {AvailablePartiesTimes}
 */
export default function createAvailablePartyTimes(
	partyDateString,
	existingPartiesTimes
) {
	const today = new Date();
	const partyDate =
		partyDateString > createDateElDateString(today)
			? new Date(`${partyDateString}T00:00:00`)
			: new Date(today);
	const dayAfterPartyDate = new Date(
		partyDate.getFullYear(),
		partyDate.getMonth(),
		partyDate.getDate() + 1
	);
	const partyIntervalsInMinutes = 20;

	if (partyDate.toISOString() === today.toISOString()) {
		partyDate.setMinutes(
			partyDate.getMinutes() +
				partyIntervalsInMinutes -
				(partyDate.getMinutes() % partyIntervalsInMinutes)
		);
	}

	/**
	 * @type {AvailablePartiesTimes}
	 */
	const availablePartyTimes = [];

	while (partyDate < dayAfterPartyDate) {
		!existingPartiesTimes.includes(partyDate.toString()) &&
			availablePartyTimes.push([
				partyDate.getHours(),
				partyDate.getMinutes(),
			]);
		partyDate.setMinutes(partyDate.getMinutes() + partyIntervalsInMinutes);
	}

	return availablePartyTimes;
}
