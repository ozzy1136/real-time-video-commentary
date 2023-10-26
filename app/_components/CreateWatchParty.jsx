"use client";

import { z } from "zod";
import { Form, Field } from "houseform";

import { useRef, useState } from "react";

import createAvailablePartyTimes from "@utils/createAvailablePartyTimes";
import { createDateElDateString } from "@utils/createDateElementDate";
import {
	dateStringSchema,
	partyDataSchema,
	timeStringSchema,
} from "@lib/zod/schemas/index";
import { getTimeFromDate } from "@utils/getTimeFromDate";

/**
 * @param {Object} props
 * @param {Array<z.infer<partyDataSchema>>} props.existingPartiesData
 */
export default function CreateWatchParty({ existingPartiesData }) {
	const todayDateString = createDateElDateString(new Date());
	const existingPartiesDataTimes = existingPartiesData.map(
		(i) => i.start_time
	);
	const formRef = useRef(null);
	const [availablePartyTimes, setAvailablePartyTimes] = useState(
		createAvailablePartyTimes(todayDateString, existingPartiesDataTimes)
	);

	return (
		<Form>
			{({ submit }) => {
				return (
					<form
						action={"/api/watch-party/new"}
						method="post"
						ref={formRef}
						onSubmit={async (e) => {
							e.preventDefault();
							const isValid = await submit();
							if (!isValid) return;
							formRef.current.submit();
						}}
					>
						<Field
							name="party-date"
							initialValue={todayDateString}
							onSubmitValidate={dateStringSchema}
						>
							{({ value, setValue, errors, onBlur }) => (
								<div>
									<label>
										Pick a date{" "}
										<input
											name="party-date"
											type="date"
											value={value}
											onChange={(e) => {
												setValue(e.currentTarget.value);
												setAvailablePartyTimes(
													createAvailablePartyTimes(
														e.currentTarget.value,
														existingPartiesDataTimes
													)
												);
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
							)}
						</Field>
						<Field
							name="party-time"
							onSubmitValidate={timeStringSchema}
							initialValue={getTimeFromDate(
								availablePartyTimes[0]
							)}
						>
							{({ value, setValue, errors, onBlur }) => (
								<div>
									<label>
										Pick a time
										<select
											name="party-time"
											value={value}
											onChange={(e) =>
												setValue(e.currentTarget.value)
											}
											onBlur={onBlur}
											required
										>
											{availablePartyTimes.map((time) => (
												<option
													value={getTimeFromDate(
														time
													)}
													key={time.getTime()}
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
							)}
						</Field>
						<button type="submit">Create Party</button>
					</form>
				);
			}}
		</Form>
	);
}
