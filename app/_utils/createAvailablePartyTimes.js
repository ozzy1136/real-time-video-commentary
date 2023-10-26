import { z } from "zod";

import { dateStringSchema } from "@lib/zod/schemas";

const availablePartyTimeSchema = z.date();

/**
 * @param {z.input<typeof dateStringSchema>} partyDateString
 * @param {Array<number>} existingPartiesTimes Seconds since epoch of party time
 * @returns {Array<z.infer<typeof availablePartyTimeSchema>>}
 */
export default function createAvailablePartyTimes(
	partyDateString,
	existingPartiesTimes
) {
	const partyIntervalsInMinutes = 20;
	/**
	 * Use local time methods
	 */
	const todayDate = new Date();
	/**
	 * Use UTC time methods
	 */
	const partyDate = new Date(partyDateString);
	/**
	 * Use UTC time methods
	 */
	const dayAfterPartyDate = new Date(
		partyDate.getUTCFullYear(),
		partyDate.getUTCMonth(),
		partyDate.getUTCDate() + 1
	);

	dayAfterPartyDate.setUTCHours(0, 0, 0, 0);

	if (partyDate.getUTCDate() === todayDate.getDate()) {
		partyDate.setUTCHours(
			todayDate.getHours(),
			todayDate.getMinutes() +
				partyIntervalsInMinutes -
				(todayDate.getMinutes() % partyIntervalsInMinutes)
		);
	}

	const availablePartyTimes = [];

	while (partyDate < dayAfterPartyDate) {
		if (!existingPartiesTimes.includes(partyDate.getTime())) {
			availablePartyTimes.push(new Date(partyDate));
		}
		partyDate.setUTCMinutes(
			partyDate.getUTCMinutes() + partyIntervalsInMinutes
		);
	}

	return availablePartyTimes;
}
