import createURL from "@utils/createURL";
import movieData from "@data/shazamMovieData";

/**
 * @typedef {Object} MovieDetails
 * @property {boolean} [adult]
 * @property {string} [backdrop_path]
 * @property {{id: number, name: string, poster_path: string, backdrop_path: string}} [belongs_to_collection]
 * @property {number} [budget]
 * @property {Array<{id: number, name: string}>} [genres]
 * @property {string} [homepage]
 * @property {number} [id]
 * @property {string} [imdb_id]
 * @property {string} [original_language]
 * @property {string} [original_title]
 * @property {string} [overview]
 * @property {number} [popularity]
 * @property {string} [poster_path]
 * @property {Array<{id: number, logo_path: string, name: string, origin_country: string}} [production_companies]
 * @property {Array<{iso_3166_1: string, name: string}} [production_countries]
 * @property {string} [release_date]
 * @property {number} [revenue]
 * @property {number} [runtime]
 * @property {Array<{english_name: string, iso_639_1: string, name: string}} [spoken_languages]
 * @property {string} [status]
 * @property {string} [tagline]
 * @property {string} [title]
 * @property {boolean} [video]
 * @property {number} [vote_average]
 * @property {number} [vote_count]
 * @property {boolean} success
 */

/**
 * @async
 * @param {string} id
 * @returns {Promise<MovieDetails>}
 */
export async function getMovieDetails(id) {
	movieData.success = true;
	return movieData;
	// if (id.match(/^(?=(\d{1,10}))\1$/)) {
	// 	const fetchRequestForMovieDetails = new Request(
	// 		`${process.env.NEXT_PUBLIC_TMDB_API_BASE_URL}/movie/${id}`,
	// 		{
	// 			method: "GET",
	// 			headers: {
	// 				Authorization: `Bearer ${process.env.TMDB_API_READ_ACCESS_TOKEN}`,
	// 			},
	// 		}
	// 	);
	// 	const response = await fetch(fetchRequestForMovieDetails);
	// 	const data = await response.json();
	// 	data.success = true;
	// 	return Promise.resolve(data);
	// } else {
	// 	return Promise.resolve({ success: false });
	// }
}

/**
 * @typedef {Object} DiscoverMovieDetails
 * @property {boolean} adult
 * @property {string} backdrop_path
 * @property {Array<number>} genre_ids
 * @property {number} id
 * @property {string} original_language
 * @property {string} original_title
 * @property {string} overview
 * @property {number} popularity
 * @property {string} poster_path
 * @property {string} release_date
 * @property {string} title
 * @property {boolean} video
 * @property {number} vote_average
 * @property {number} vote_count
 */

/**
 * @typedef {Object} PopularMovies
 * @property {number} [page]
 * @property {Array<DiscoverMovieDetails>} [results]
 * @property {number} [total_pages]
 * @property {number} [total_results]
 * @property {boolean} success
 */

/**
 * @async
 * @returns {Promise<PopularMovies>}
 */
export async function getPopularMovies() {
	const requestURL = createURL(
		process.env.NEXT_PUBLIC_TMDB_API_BASE_URL,
		"/discover/movie",
		[
			["region", "US"],
			["release_date.gte", "2022-01-09"],
			["watch_region", "US"],
			["with_release_type", "4"],
			["with_watch_monetization_types", "flatrate"],
		]
	);

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
