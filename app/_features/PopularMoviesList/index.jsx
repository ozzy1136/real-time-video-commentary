import Link from "next/link";

import styles from "./index.module.css";
import { getPopularMovies } from "@services/tmdb";

export default async function PopularMoviesList() {
	const { popularMoviesData, error } = await getPopularMovies();

	const view = error ? (
		<p>There was an error getting popular movies. Try again later.</p>
	) : (
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

	return view;
}
