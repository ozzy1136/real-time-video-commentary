"use client";

import { useEffect, useState, useMemo } from "react";

import createAvailablePartyTimes from "@utils/createAvailablePartyTimes";

function handleCreatePartySubmit(e) {
	e.preventDefault();

	alert("Your party information was submitted successfully");
}

/**
 * @param {Object} props
 * @param {Array<import("@hooks/usePartiesDataState").PartyData>} props.existingPartiesData
 */
export default function CreateWatchParty({ existingPartiesData }) {
	const today = useMemo(() => new Date(), []);
	const todayDateString = today.toISOString().split("T")[0];
	const [partyDateString, setPartyDateString] = useState(todayDateString);
	const [availablePartyTimes, setAvailablePartyTimes] = useState(
		/**
		 * @type {Array<import("@utils/createAvailablePartyTimes").AvailablePartyDetails>}
		 */
		([])
	);

	useEffect(() => {
		setAvailablePartyTimes(
			createAvailablePartyTimes(
				today,
				partyDateString,
				existingPartiesData.map((i) =>
					new Date(i.start_time).toString()
				)
			)
		);
	}, [today, partyDateString, existingPartiesData]);

	return (
		<form onSubmit={handleCreatePartySubmit}>
			<label>
				Pick a date{" "}
				<input
					type="date"
					value={partyDateString}
					name="party-date"
					id="party-date"
					onChange={(e) => setPartyDateString(e.currentTarget.value)}
					min={`${todayDateString}`}
					required
				/>
			</label>
			<label>
				Pick a time
				<select name="party-time" required>
					{availablePartyTimes.map(([hour, minute]) => (
						<option
							value={`${hour}:${minute}`}
							key={`${hour}:${minute}`}
						>
							{hour < 10 ? `0${hour}` : hour}:
							{minute < 10 ? `0${minute}` : minute}
						</option>
					))}
				</select>
			</label>
			<button type="submit">Create Party</button>
		</form>
	);
}
