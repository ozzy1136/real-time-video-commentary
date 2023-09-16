import { notFound } from "next/navigation";
import Image from "next/image";

import styles from "@styles/MovieDetailsPage.module.css";
import { getMovieDetails } from "@services/tmdb";
import ShazamMoviePoster from "@images/shazam-movie-poster.webp";
import WatchPartyInfo from "@components/WatchPartyInfo";

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
	const movieData = await getMovieDetails(params.id);

	if (!movieData.success) {
		notFound();
	}

	return (
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
					// src={`${process.env.NEXT_PUBLIC_TMDB_POSTERS_BASE_URL}${movieData.posterPath}`}
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
}
