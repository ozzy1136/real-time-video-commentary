import { TMDB_API_BASE_URL } from "@data/constants";
import createURL from "@utils/createURL";

export async function getMovieDetails(id) {
	if (id.match(/^(?=(\d{1,10}))\1$/)) {
		const apiUrl = createURL(TMDB_API_BASE_URL, `/movie/${id}`);
		const fetchRequestForMovieDetails = new Request(apiUrl.href, {
			method: "GET",
			headers: {
				Authorization: `Bearer ${process.env.TMDB_API_READ_ACCESS_TOKEN}`,
			},
		});
		const response = await fetch(fetchRequestForMovieDetails);
		const data = await response.json();
		data.success = true;
		return Promise.resolve(data);
	} else {
		return Promise.resolve({ success: false });
	}
}

export async function getPopularMovies() {
	const requestURL = createURL(TMDB_API_BASE_URL, "/discover/movie", [
		["region", "US"],
		["release_date.gte", "2022-01-09"],
		["watch_region", "US"],
		["with_release_type", "4"],
		["with_watch_monetization_types", "flatrate"],
	]);

	const fetchRequestForPopularMovies = new Request(requestURL.href, {
		method: "GET",
		headers: {
			Authorization: `Bearer ${process.env.TMDB_API_READ_ACCESS_TOKEN}`,
		},
		cache: "no-cache",
	});

	const response = await fetch(fetchRequestForPopularMovies);

	if (!response.ok) {
		return Promise.resolve({
			success: false,
		});
	}

	const data = await response.json();
	data.success = true;
	return Promise.resolve(data);
}
