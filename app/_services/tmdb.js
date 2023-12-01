import { z } from "zod";

import movieData from "@data/shazamMovieData";
import popularMoviesData from "@data/popularMoviesData";
import createURL from "@utils/createURL";
import { movieIdSchema } from "@lib/zod/schemas";

/**
 * @typedef {Object} MovieDetails
 * @property {boolean} [adult]
 * @property {string} [backdrop_path]
 * @property {{id: number, name: string, poster_path: string
 * , backdrop_path: string}} [belongs_to_collection]
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
 * @property {Array<{id: number, logo_path: string, name: string, origin_country: string}>} [production_companies]
 * @property {Array<{iso_3166_1: string, name: string}>} [production_countries]
 * @property {string} [release_date]
 * @property {number} [revenue]
 * @property {number} [runtime]
 * @property {Array<{english_name: string, iso_639_1: string, name: string}>} [spoken_languages]
 * @property {string} [status]
 * @property {string} [tagline]
 * @property {string} [title]
 * @property {boolean} [video]
 * @property {number} [vote_average]
 * @property {number} [vote_count]
 * @property {boolean} success
 */

/**
 * @param {string} id
 */
export async function getMovieDetails(id) {
	try {
		const movieId = movieIdSchema.parse(id);
		const res = await fetch(
			`${process.env.NEXT_PUBLIC_TMDB_API_BASE_URL}/movie/${movieId}`,
			{
				headers: {
					Authorization: `Bearer ${process.env.TMDB_API_READ_ACCESS_TOKEN}`,
				},
			}
		);
		if (!res.ok) {
			const error = new Error(
				"An error occurred while fetching the data."
			);
			error.info = await res.json();
			error.status = res.status;
			throw error;
		}
		/**
		 * @type {MovieDetails}
		 */
		const data = await res.json();
		return { movieData: data };
		return { movieData: movieData };
	} catch (error) {
		if (error instanceof z.ZodError) {
			return { isNotFound: true };
		}
		if (error.status === 404) {
			return { isNotFound: true };
		}
		return { error };
	}
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

export async function getPopularMovies() {
	try {
		// const res = await fetch(
		// 	createURL(
		// 		process.env.NEXT_PUBLIC_TMDB_API_BASE_URL,
		// 		"/discover/movie",
		// 		[
		// 			["region", "US"],
		// 			["release_date.gte", "2022-01-09"],
		// 			["watch_region", "US"],
		// 			["with_release_type", "4"],
		// 			["with_watch_monetization_types", "flatrate"],
		// 		]
		// 	).href,
		// 	{
		// 		headers: {
		// 			Authorization: `Bearer ${process.env.TMDB_API_READ_ACCESS_TOKEN}`,
		// 		},
		// 	}
		// );
		// /**
		//  * @type {PopularMovies}
		//  */
		// const data = await res.json();
		// return { popularMoviesData: data };
		return { popularMoviesData: popularMoviesData };
	} catch (error) {
		return { error };
	}
}
