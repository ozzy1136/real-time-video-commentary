/**
 * Return JSON data from fetch request; Compatible with SWR options format.
 * @param {[RequestInfo, RequestInit]} options
 * @returns {Promise<Object>}
 */
export const jsonFetcher = async ([url, fetchOpts]) => {
	const res = await fetch(url, fetchOpts);
	if (!res.ok) {
		const error = new Error("An error occurred while fetching the data.");
		// Attach extra info to the error object.
		error.info = await res.json();
		error.status = res.status;
		throw error;
	}
	const data = await res.json();
	return data;
};
