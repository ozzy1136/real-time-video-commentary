import { z } from "zod";
import { Form, Field } from "houseform";

import { useRef, useState } from "react";

import createAvailablePartyTimes from "@utils/createAvailablePartyTimes";
import createDateElDateString from "@utils/createDateElementDate";
import {
	dateStringSchema,
	partyDataSchema,
	timeStringSchema,
} from "@lib/zod/schemas";
import getTimeFromDate from "@utils/getTimeFromDate";

/**
 * @param {Object} props
 * @param {Array<z.infer<partyDataSchema>>} props.existingPartiesData
 */
export default function CreateWatchParty({ existingPartiesData }) {
	const todayDateString = createDateElDateString(new Date());
	const existingPartiesDataTimes = existingPartiesData.map(
		(i) => i.start_time
	);
	const htmlFormRef = useRef(null);
	const [availablePartyTimes, setAvailablePartyTimes] = useState([]);

	return (
		<Form>
			{({ submit, isValid }) => {
				return (
					<form
						action={"/api/watch-party"}
						method="post"
						ref={htmlFormRef}
						onSubmit={async (e) => {
							e.preventDefault();
							const isValid = await submit();
							if (!isValid) return;
							htmlFormRef.current.submit();
						}}
					>
						<Field
							name="party-date"
							initialValue={todayDateString}
							onBlurValidate={dateStringSchema}
						>
							{({ value, setValue, errors }) => (
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
											onBlur={(e) => {
												setAvailablePartyTimes(
													createAvailablePartyTimes(
														e.target.value,
														existingPartiesDataTimes
													)
												);
											}}
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
						{isValid && (
							<Field
								name="party-time"
								initialValue={
									availablePartyTimes.length > 0
										? getTimeFromDate(
												availablePartyTimes[0]
										  )
										: ""
								}
								onBlurValidate={timeStringSchema}
							>
								{({ value, setValue, errors }) => (
									<div>
										<label>
											Pick a time
											<select
												name="party-time"
												value={value}
												onChange={(e) =>
													setValue(
														e.currentTarget.value
													)
												}
												required
											>
												{availablePartyTimes.map(
													(time) => (
														<option
															value={getTimeFromDate(
																time
															)}
															key={time.getTime()}
														>
															{time.toUTCString()}
														</option>
													)
												)}
											</select>
										</label>
										{errors.map((error) => (
											<p key={error}>{error}</p>
										))}
									</div>
								)}
							</Field>
						)}
						<button type="submit">Create Party</button>
					</form>
				);
			}}
		</Form>
	);
}
