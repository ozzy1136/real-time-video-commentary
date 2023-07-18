import { notFound } from "next/navigation";

import styles from "@styles/MovieDetailsPage.module.css";
import { getMovieDetails } from "@services/tmdb";

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
				<h1 className={styles.title}>Movie Title: {movieData.title}</h1>
			</div>
		</div>
	);
}
