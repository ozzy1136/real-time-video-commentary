"use client";

import AvailableMovieWatchParties from "./components/AvailableMovieWatchParties";
import CreateWatchParty from "./components/CreateWatchParty";
import usePartiesDataState from "./hooks/usePartiesDataState";

/**
 * @param {Object} props
 * @param {number} props.id - Movie ID
 */
export default function WatchPartyInfo({ id }) {
	const partiesDataState = usePartiesDataState(id);

	if (partiesDataState.status === "loading")
		return <p>Loading available watch parties...</p>;

	if (partiesDataState.status === "error")
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
		<>
			<AvailableMovieWatchParties partiesData={partiesDataState.data} />
			<CreateWatchParty partiesData={partiesDataState.data} />
		</>
	);
}
