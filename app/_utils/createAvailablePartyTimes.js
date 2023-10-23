import { z } from "zod";

import { createDateElDateString } from "./createDateElementDate";

const availablePartyTimeSchema = z.date();

/**
 * @param {string} partyDateString
 * @param {Array<number>} existingPartiesTimes Result of calling toString on Dates for existing parties start time
 * @returns {Array<z.infer<typeof availablePartyTimeSchema>>}
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

	if (partyDate.getTime() === today.getTime()) {
		partyDate.setMinutes(
			partyDate.getMinutes() +
				partyIntervalsInMinutes -
				(partyDate.getMinutes() % partyIntervalsInMinutes)
		);
	}

	const availablePartyTimes = [];

	while (partyDate < dayAfterPartyDate) {
		!existingPartiesTimes.includes(partyDate.getTime()) &&
			availablePartyTimes.push(new Date(partyDate));
		partyDate.setMinutes(partyDate.getMinutes() + partyIntervalsInMinutes);
	}

	return availablePartyTimes;
}
