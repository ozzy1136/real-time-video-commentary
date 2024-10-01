import { z } from "zod";

import { dateStringSchema, partyDataSchema } from "@lib/zod/schemas";
import { getDayjsDate } from "@lib/dayjs";

const availablePartyTimeSchema = z.date();

/**
 * @param {z.input<typeof dateStringSchema>} partyDateString
 * @param {Array<z.infer<typeof partyDataSchema>>} partiesData
 * @returns {Array<z.infer<typeof availablePartyTimeSchema>>}
 */
export default function createAvailablePartyTimes(
	partyDateString,
	partiesData,
) {
	const existingPartyTimes = partiesData.map((i) => i.start_time);
	const availablePartyTimes = [];
	const partyIntervalsInMinutes = 20;
	const now = getDayjsDate();
	const dayOfParty =
		partyDateString === now.format("YYYY-MM-DD")
			? getDayjsDate({
					dateObj: partyDateString,
					customStringFormat: "YYYY-MM-DD",
			  })
					.hour(now.hour())
					.minute(
						now.minute() +
							partyIntervalsInMinutes -
							(now.minute() % partyIntervalsInMinutes),
					)
			: getDayjsDate({
					dateObj: partyDateString,
					customStringFormat: "YYYY-MM-DD",
			  });
	const dayAfterParty = dayOfParty.add(1, "day").startOf("day");

	for (
		let curr = dayOfParty.clone();
		curr.isBefore(dayAfterParty);
		curr = curr.minute(curr.minute() + partyIntervalsInMinutes)
	) {
		if (!existingPartyTimes.includes(curr.valueOf())) {
			availablePartyTimes.push(curr.toDate());
		}
	}

	return availablePartyTimes;
}
