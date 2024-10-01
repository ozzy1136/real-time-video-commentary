import { z } from "zod";
import { Form, Field } from "houseform";

import { useReducer } from "react";

import createAvailablePartyTimes from "@utils/createAvailablePartyTimes";
import {
	dateStringSchema,
	partyDataSchema,
	timeStringSchema,
} from "@lib/zod/schemas";
import { getDayjsDate, getTimeFromDate } from "@lib/dayjs";
import DateSelector from "./DateSelector";
import TimeSelector from "./TimeSelector";

const initialState = {
	mode: "loading",
	times: [],
};

/**
 *
 * @param {initialState} state
 * @param {{type: string, payload}} action
 * @returns
 */
function reducer(state, action) {
	switch (action.type) {
		case "set-mode": {
			return {
				...state,
				mode: action.payload,
			};
		}

		case "set-times": {
			const times = createAvailablePartyTimes(
				action.payload.value,
				action.payload.partiesData,
			);
			const mode = times.length ? "idle" : "no-times";

			return {
				...state,
				mode,
				times: times,
			};
		}

		case "reset": {
			return initialState;
		}

		default:
			return initialState;
	}
}

/**
 * @param {Object} props
 * @param {z.infer<typeof partyDataSchema>[]} props.partiesData
 */
export default function CreateWatchParty({ partiesData }) {
	const [availableTimes, dispatchAvailableTimes] = useReducer(
		reducer,
		initialState,
	);
	const todayDateString = getDayjsDate().format("YYYY-MM-DD");

	function createNewWatchParty(values) {
		alert(values);
	}

	return (
		<Form onSubmit={createNewWatchParty}>
			{({ submit, isValid }) => (
				<form
					onSubmit={(e) => {
						e.preventDefault();
						submit();
					}}
				>
					<Field
						name="party-date"
						initialValue={todayDateString}
						onChangeValidate={dateStringSchema}
					>
						{({ value, setValue, onBlur, errors }) => (
							<DateSelector
								value={value}
								setValue={setValue}
								onBlur={onBlur}
								errors={errors}
								dispatchAvailableTimes={dispatchAvailableTimes}
								partiesData={partiesData}
								todayDateString={todayDateString}
							/>
						)}
					</Field>
					{availableTimes.mode === "loading" && (
						<p aria-live="polite">Loading times...</p>
					)}
					{availableTimes.mode === "error" && null}
					{availableTimes.mode === "no-times" && (
						<p>
							There is already a party with your desired time.
							Check existing parties.
						</p>
					)}
					{availableTimes.mode === "idle" && (
						<Field
							name="party-time"
							initialValue={getTimeFromDate(
								availableTimes.times[0],
								true,
							)}
							onSubmitValidate={timeStringSchema}
						>
							{({ value, setValue, onBlur, errors }) => (
								<TimeSelector
									value={value}
									setValue={setValue}
									onBlur={onBlur}
									errors={errors}
									availablePartyTimes={availableTimes.times}
								/>
							)}
						</Field>
					)}
					<button type="submit" disabled={!isValid}>
						Create Party
					</button>
				</form>
			)}
		</Form>
	);
}
