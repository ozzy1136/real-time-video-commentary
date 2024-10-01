import { getTimeFromDate } from "@lib/dayjs";

export default function WatchPartyTimeSelector({
	value,
	setValue,
	onBlur,
	errors,
	availablePartyTimes,
}) {
	return (
		<div>
			<label>
				Pick a time{" "}
				<select
					name="party-time"
					value={value}
					onChange={(e) => setValue(e.currentTarget.value)}
					onBlur={onBlur}
					required
				>
					{availablePartyTimes.map((time) => (
						<option
							value={getTimeFromDate(time, true)}
							key={time.valueOf()}
						>
							{getTimeFromDate(time)}
						</option>
					))}
				</select>
			</label>
			{errors.map((error) => (
				<p key={error}>{error}</p>
			))}
		</div>
	);
}
