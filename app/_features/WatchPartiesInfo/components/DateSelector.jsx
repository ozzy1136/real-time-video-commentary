import { useEffect } from "react";

import { getDayjsDate } from "@lib/dayjs";

export default function DateSelector({
	value,
	setValue,
	onBlur,
	errors,
	dispatchAvailableTimes,
	partiesData,
	todayDateString,
}) {
	useEffect(() => {
		if (errors.length) {
			dispatchAvailableTimes({ type: "set-mode", payload: "error" });
			return () => {};
		}
		dispatchAvailableTimes({
			type: "set-mode",
			payload: "loading",
		});
		const timeoutId = setTimeout(() => {
			dispatchAvailableTimes({
				type: "set-times",
				payload: {
					value: value,
					partiesData: partiesData,
				},
			});
		}, 1750);

		return () => {
			clearTimeout(timeoutId);
		};
	}, [value, errors, dispatchAvailableTimes, partiesData]);

	return (
		<div>
			<label>
				Pick a date{" "}
				<input
					name="party-date"
					type="date"
					value={value}
					onChange={(e) => {
						setValue(e.currentTarget.value);
					}}
					onBlur={onBlur}
					min={todayDateString}
					required
				/>
			</label>
			{errors.map((error) => (
				<p key={error}>{error}</p>
			))}
		</div>
	);
}
