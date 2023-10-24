"use client";

import { z } from "zod";
import { Form, Field } from "houseform";

import { useState } from "react";

import createAvailablePartyTimes from "@utils/createAvailablePartyTimes";
import { createDateElDateString } from "@utils/createDateElementDate";
import { partyDataSchema, timeStringSchema } from "@lib/zod/schemas/index";

/**
 * @param {Object} props
 * @param {Array<z.infer<partyDataSchema>>} props.existingPartiesData
 */
export default function CreateWatchParty({ existingPartiesData }) {
	const todayDateString = createDateElDateString(new Date());
	const existingPartiesDataTimes = existingPartiesData.map((i) =>
		new Date(i.start_time).getTime()
	);
	const [availablePartyTimes, setAvailablePartyTimes] = useState(
		createAvailablePartyTimes(todayDateString, existingPartiesDataTimes)
	);
	const [isLoading, setIsLoading] = useState(false);

	/**
	 * @param {Record<string, any>} formValues
	 */
	async function handleFormSubmit(formValues) {
		setIsLoading(true);
		const res = await fetch("/api/watch-party/new", {
			method: "POST",
			body: JSON.stringify(formValues),
		});
		const data = await res.json();
		console.log(JSON.stringify(data));
		setIsLoading(false);
	}

	return (
		<Form onSubmit={handleFormSubmit}>
			{({ isValid, submit }) => {
				return (
					<form
						onSubmit={(e) => {
							e.preventDefault();
							submit();
						}}
					>
						<Field
							name="party-date"
							initialValue={todayDateString}
							onBlurValidate={z
								.string()
								.pipe(
									z.coerce
										.date()
										.min(
											new Date(todayDateString),
											"You must choose today's date or a later date"
										)
								)}
						>
							{({ value, setValue, errors, onBlur }) => (
								<div>
									<label>
										Pick a date{" "}
										<input
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
							onBlurValidate={timeStringSchema}
							initialValue={availablePartyTimes[0]
								.toTimeString()
								.slice(0, 5)}
						>
							{({ value, setValue, errors, onBlur }) => (
								<div>
									<label>
										Pick a time
										<select
											value={value}
											onChange={(e) =>
												setValue(e.currentTarget.value)
											}
											onBlur={onBlur}
											required
										>
											{availablePartyTimes.map((time) => (
												<option
													value={`${time
														.toTimeString()
														.slice(0, 5)}`}
													key={time.getTime()}
												>
													{`${time
														.toTimeString()
														.slice(0, 5)}`}
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
						<button disabled={!isValid || isLoading} type="submit">
							Create Party
						</button>
					</form>
				);
			}}
		</Form>
	);
}
