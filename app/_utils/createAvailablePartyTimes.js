import { z } from "zod";

import { dateStringSchema } from "@lib/zod/schemas";
import { getDayjsDate } from "@lib/dayjs";

const availablePartyTimeSchema = z.date();

/**
 * @param {z.input<typeof dateStringSchema>} partyDateString
 * @param {Array<number>} existingPartiesTimes Seconds since epoch of party time
 * @returns {Array<z.infer<typeof availablePartyTimeSchema>>}
 */
export default function createAvailablePartyTimes(
	partyDateString,
	existingPartiesTimes,
) {
	const availablePartyTimes = [];
	const partyIntervalsInMinutes = 20;
	const now = getDayjsDate();
	const dayOfParty =
		partyDateString === now.format("YYYY-MM-DD")
			? getDayjsDate(partyDateString, "YYYY-MM-DD")
					.hour(now.hour())
					.minute(
						now.minute() +
							partyIntervalsInMinutes -
							(now.minute() % partyIntervalsInMinutes),
					)
			: getDayjsDate(partyDateString, "YYYY-MM-DD");
	const dayAfterParty = dayOfParty.add(1, "day").startOf("day");

	for (
		let curr = dayOfParty.clone();
		curr.isBefore(dayAfterParty);
		curr = curr.minute(curr.minute() + partyIntervalsInMinutes)
	) {
		if (!existingPartiesTimes.includes(curr.valueOf())) {
			availablePartyTimes.push(curr.toDate());
		}
	}

	return availablePartyTimes;
}
