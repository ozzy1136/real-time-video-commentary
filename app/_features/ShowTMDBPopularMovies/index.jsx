import Link from "next/link";

import styles from "./index.module.css";
import { getPopularMovies } from "@services/tmdb";

export default async function PopularMoviesList() {
	const popularMoviesData = await getPopularMovies();

	if (!popularMoviesData.success) {
		return (
			<div>
				<p>
					There was an error while searching for popular movies.
					Refresh the page to get information about popular movies.
				</p>
			</div>
		);
	}

	return (
		<ul className={styles.popularMoviesContainer}>
			{popularMoviesData.results.map((movieInfo) => (
				<li key={movieInfo.id}>
					<Link href={`/movies/${movieInfo.id}`}>
						{movieInfo.title}
					</Link>
				</li>
			))}
		</ul>
	);
}
