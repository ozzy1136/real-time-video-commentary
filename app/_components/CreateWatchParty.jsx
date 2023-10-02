"use client";

import { useEffect, useState } from "react";

import createAvailablePartyTimes from "@utils/createAvailablePartyTimes";
import { createDateElDateString } from "@utils/createDateElementDate";

/**
 * @param {Object} props
 * @param {Array<import("@hooks/usePartiesDataState").PartyData>} props.existingPartiesData
 */
export default function CreateWatchParty({ existingPartiesData }) {
	const todayDateString = createDateElDateString(new Date());
	const [partyDateString, setPartyDateString] = useState(todayDateString);
	const [partyTimeString, setPartyTimeString] = useState("");
	const [availablePartyTimes, setAvailablePartyTimes] = useState(
		/**
		 * @type {Array<import("@utils/createAvailablePartyTimes").AvailablePartyDetails>}
		 */
		([])
	);

	function handleFormSubmit(e) {
		e.preventDefault();

		alert("Form was submitted");
	}

	useEffect(() => {
		setAvailablePartyTimes(
			createAvailablePartyTimes(
				partyDateString,
				existingPartiesData.map((i) =>
					new Date(i.start_time).toString()
				)
			)
		);
	}, [partyDateString, existingPartiesData]);

	return (
		<form onSubmit={handleFormSubmit}>
			<label>
				Pick a date{" "}
				<input
					type="date"
					value={partyDateString}
					name="party-date"
					id="party-date"
					onChange={(e) => setPartyDateString(e.currentTarget.value)}
					min={todayDateString}
					required
				/>
			</label>
			<label>
				Pick a time
				<select
					name="party-time"
					value={partyTimeString}
					onChange={(e) => setPartyTimeString(e.currentTarget.value)}
					required
				>
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
