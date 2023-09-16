import Link from "next/link";

import { getPopularMovies } from "@services/tmdb";

/**
 * @param {Object} props
 * @param {{popularMoviesContainer: string}} props.classNames
 */
export default async function PopularMoviesList({ classNames }) {
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
		<ul className={classNames.popularMoviesContainer}>
			{popularMoviesData.results.map((movieInfo) => (
				<li key={`${movieInfo.id}`}>
					<Link href={`/movies/${movieInfo.id}`}>
						{movieInfo.title}
					</Link>
				</li>
			))}
		</ul>
	);
}
