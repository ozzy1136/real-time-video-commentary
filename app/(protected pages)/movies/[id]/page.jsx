import { notFound } from "next/navigation";
import Image from "next/image";

import styles from "./index.module.css";
import { getMovieDetails } from "@services/tmdb";
import ShazamMoviePoster from "@images/shazam-movie-poster.webp";
import WatchPartyInfo from "@features/WatchPartiesInfo";

export const metadata = {
	title: "Movie Details | Real Time Video Commentary",
};

/**
 * @typedef {Object} RouteParams
 * @property {string} id - Movie ID
 */

/**
 * @param {Object} props
 * @param {RouteParams} props.params
 */
export default async function MovieDetailsPage({ params }) {
	const { movieData, error, isNotFound } = await getMovieDetails(params.id);

	if (isNotFound) {
		notFound();
	}

	if (error) {
		console.log(error);
	}

	const view = error ? (
		<p>There was an error getting the movie details. Try again.</p>
	) : (
		<main className={`section-container ${styles.container}`}>
			<div className={styles.titleWrapper}>
				<h1 className={styles.title}>{movieData.title}</h1>
				<h2>{movieData.tagline}</h2>
				<div className={styles.runtimeWrapper}>
					<i>
						{Math.floor(movieData.runtime / 60)} hours{" "}
						{movieData.runtime % 60} minutes
					</i>
				</div>
				<p>{movieData.overview}</p>
			</div>
			<div className={styles.posterWrapper}>
				<Image
					src={ShazamMoviePoster}
					// src={`${process.env.NEXT_PUBLIC_TMDB_POSTERS_BASE_URL}${movieData.poster_path}`}
					alt={`Theatrical poster for the movie ${movieData.title}`}
					width={500}
					height={750}
					priority
					className={styles.poster}
				/>
			</div>
			<div className={styles.partiesWrapper}>
				<WatchPartyInfo id={movieData.id} />
			</div>
		</main>
	);

	return view;
}
