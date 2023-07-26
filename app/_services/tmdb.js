import { TMDB_API_BASE_URL } from "@data/constants";
import createURL from "@utils/createURL";

/**
 * @typedef {Object} MovieDetails
 * @prop {boolean} adult
 * @prop {string} backdrop_path
 * @prop {{id: number, name: string, poster_path: string, backdrop_path: string}} belongs_to_collection
 * @prop {number} budget
 * @prop {Array<{id: number, name: string}>} genres
 * @prop {string} homepage
 * @prop {number} id
 * @prop {string} imdb_id
 * @prop {string} original_language
 * @prop {string} original_title
 * @prop {string} overview
 * @prop {number} popularity
 * @prop {string} poster_path
 * @prop {array<{id: number, logo_path: string, name: string, origin_country: string}} production_companies
 * @prop {array<{iso_3166_1: string, name: string}} production_countries
 * @prop {string} release_date
 * @prop {number} revenue
 * @prop {number} runtime
 * @prop {array<{english_name: string, iso_639_1: string, name: string}} spoken_languages
 * @prop {string} status
 * @prop {string} tagline
 * @prop {string} title
 * @prop {boolean} video
 * @prop {number} vote_average
 * @prop {number} vote_count
 * @prop {boolean} success
 */

/**
 * @async
 * @param {string} id
 * @returns {Promise.<MovieDetails>}
 */
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

export async function getTmdbApiConfig() {
	const fetchRequestForApiConfig = new Request(
		`${TMDB_API_BASE_URL}/configuration`,
		{
			method: "GET",
			headers: {
				Authorization: `Bearer ${process.env.TMDB_API_READ_ACCESS_TOKEN}`,
			},
		}
	);
	const response = await fetch(fetchRequestForApiConfig);
	if (!response.ok) {
		throw new Error(response.statusText);
	}
	const tmdbApiConfig = await response.json();
	return tmdbApiConfig;
}
