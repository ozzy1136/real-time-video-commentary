import { notFound } from "next/navigation";

import styles from "@styles/MovieDetailsPage.module.css";
import { getMovieDetails } from "@services/tmdb";
import MoviePoster from "@components/MoviePoster";

export const metadata = {
	title: "Movie Details | Real Time Video Commentary",
};

export default async function MovieDetailsPage({ params }) {
	const movieData = await getMovieDetails(params.id);

	if (!movieData.success) {
		notFound();
	}

	return (
		<div className="section-container">
			<div className={styles.titleWrapper}>
				<MoviePoster
					movieTitle={movieData.title}
					posterPath={movieData.poster_path}
				/>
				<h1 className={styles.title}>Movie Title: {movieData.title}</h1>
				<h2>{movieData.tagline}</h2>
				<p>{movieData.overview}</p>
				<i>{movieData.runtime % 60} minutes</i>
			</div>
		</div>
	);
}
