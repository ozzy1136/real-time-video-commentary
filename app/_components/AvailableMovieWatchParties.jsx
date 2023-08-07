"use client";

import { supabaseClientComponentClient } from "@lib/supabaseClient";
import { useReducer, useEffect } from "react";

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

export default function AvailableMovieWatchParties({ id }) {
	const supabaseClient = supabaseClientComponentClient();
	const [partiesState, partiesDispatch] = useReducer(fetchReducer, {
		isLoading: true,
		data: null,
		error: null,
	});

	useEffect(() => {
		(async () => {
			const { data, error } = await supabaseClient
				.from("scheduled_parties")
				.select()
				.eq("tmdb_id", id);

			if (error) partiesDispatch({ type: "fetch_error", payload: error });

			partiesDispatch({ type: "fetch_success", payload: data });
		})();
	}, []);

	if (partiesState.isLoading)
		return <p>Loading available watch parties...</p>;

	if (partiesState.error)
		return (
			<>
				<p>
					There was an error while loading the available watch
					parties.
				</p>
				<p>Try again by refreshing the page.</p>
			</>
		);

	return (
		<div>
			<h3>Available watch parties:</h3>
			<ul>
				{partiesState.data.map((partyData) => {
					return <li key={partyData.id}>{partyData.start_time}</li>;
				})}
			</ul>
		</div>
	);
}
