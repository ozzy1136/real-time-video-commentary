/**
 * Array containing the hour and minute for the party
 * @typedef {[hour: number, minute: number]} AvailablePartyDetails
 */

/**
 * @typedef {Array<AvailablePartyDetails>} AvailablePartiesTimes
 */

/**
 * @param {Date} today
 * @param {string} partyDateString
 * @param {Array<string>} existingPartiesTimes Will only have times for the selected party date
 * @returns {AvailablePartiesTimes}
 */
export default function createAvailablePartyTimes(
	today,
	partyDateString,
	existingPartiesTimes
) {
	const partyDate =
		partyDateString > today.toISOString().split("T")[0]
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
