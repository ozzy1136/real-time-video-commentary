import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useReducer, useEffect } from "react";
import { PostgrestError } from "@supabase/supabase-js";

/**
 * @typedef {Object} PartyData
 * @property {string} created_at
 * @property {string} creator_id
 * @property {string} id
 * @property {number} movie_runtime
 * @property {string} start_time
 * @property {number} tmdb_id
 */

/**
 * @typedef {Object} PartiesState
 * @property {boolean} isLoading
 * @property {?Array<PartyData>} data
 * @property {?PostgrestError} error
 */

/**
 * @type {PartiesState}
 */
const initPartiesState = {
	isLoading: true,
	data: null,
	error: null,
};

/**
 * @callback PartiesReducer
 * @param {PartiesState} state
 * @param {Object} action
 * @param {"fetch_error"|"fetch_success"} action.type
 * @param {PostgrestError|Array<PartyData>} action.payload
 * @returns {PartiesState}
 */

/**
 * @type {PartiesReducer}
 */
function fetchReducer(state, action) {
	switch (action.type) {
		case "fetch_error": {
			return {
				...state,
				isLoading: false,
				error: action.payload,
			};
		}
		case "fetch_success": {
			return {
				...state,
				isLoading: false,
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
