import { useEffect, useState } from "react";

import styles from "@styles/PopularMoviesList.module.css";
import useFetch from "@hooks/useFetch";
import { CLIENT_CACHES } from "@data/projectConstants";
import Link from "next/link";

export default function () {
	const { data: apiResponse, error: apiRequestError } = useFetch({
		url: "/api/popular-movies",
		useCache: true,
		cacheName: CLIENT_CACHES.apiResponses,
		cacheMaxAge: 60 * 60 * 24 * 7,
	});
	const [popularMoviesList, setPopularMoviesList] = useState([]);

	useEffect(() => {
		if (apiRequestError !== null) {
			console.error(apiRequestError.message);
		}
	}, [apiRequestError]);

	useEffect(() => {
		if (apiResponse !== null) {
			(async () => {
				const { results } = await apiResponse.json();
				setPopularMoviesList(results);
			})();
		}
	}, [apiResponse]);

	return apiRequestError ? (
		<p>
			There was an error getting popular movies. Try refreshing your
			screen.
		</p>
	) : popularMoviesList.length ? (
		<ul className={styles.container}>
			{popularMoviesList.map((movieInfo) => (
				<li className={styles.listItem} key={movieInfo.id}>
					<Link href={`/movies/${movieInfo.id}`}>
						{movieInfo.title}
					</Link>
				</li>
			))}
		</ul>
	) : (
		<p>Loading...</p>
	);
}
