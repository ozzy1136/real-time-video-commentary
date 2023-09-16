/**
 * @param {Object} props
 * @param {Array<import("@hooks/usePartiesDataState").PartyData>} props.partiesData
 */
export default function AvailableMovieWatchParties({ partiesData }) {
	return (
		<div>
			<h3>Available watch parties:</h3>
			<ul>
				{partiesData.map((partyData) => {
					return (
						<li key={partyData.id}>
							{new Date(partyData.start_time).toString()}
						</li>
					);
				})}
			</ul>
		</div>
	);
}
