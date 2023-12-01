import { z } from "zod";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

import { useReducer, useEffect } from "react";

import { partyDataSchema, postgrestErrorSchema } from "@lib/zod/schemas";

const partyReducerActionSchema = z.discriminatedUnion("type", [
	z.object({
		type: z.literal("fetch_error"),
		payload: postgrestErrorSchema,
	}),
	z.object({
		type: z.literal("fetch_success"),
		payload: z.array(partyDataSchema),
	}),
]);

const partyStateSchema = z.discriminatedUnion("status", [
	z.object({ status: z.literal("loading") }),
	z.object({ status: z.literal("success"), data: z.array(partyDataSchema) }),
	z.object({ status: z.literal("error"), error: postgrestErrorSchema }),
]);

/**
 * @type {z.infer<typeof partyStateSchema>}
 */
const initPartiesState = {
	status: "loading",
};

/**
 * @callback PartiesReducer
 * @param {z.infer<typeof partyStateSchema>} state
 * @param {z.infer<typeof partyReducerActionSchema>} action
 * @returns {z.infer<typeof partyStateSchema>}
 */

/**
 * @type {PartiesReducer}
 */
function fetchReducer(_, action) {
	switch (action.type) {
		case "fetch_error": {
			return {
				status: "error",
				error: action.payload,
			};
		}
		case "fetch_success": {
			return {
				status: "success",
				data: action.payload,
			};
		}
		default:
			break;
	}
}

/**
 * @param {number} id
 */
export default function usePartiesDataState(id) {
	const supabaseClient = createClientComponentClient();
	const [state, dispatch] = useReducer(fetchReducer, initPartiesState);

	useEffect(() => {
		(async () => {
			const { data, error } = await supabaseClient
				.from("scheduled_parties")
				.select()
				.eq("tmdb_id", id);

			if (error) dispatch({ type: "fetch_error", payload: error });

			dispatch({ type: "fetch_success", payload: data });
		})();
	}, [id, supabaseClient]);

	return state;
}
