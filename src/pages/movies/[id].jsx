import { useRouter } from "next/router";

import useFetch from "@hooks/useFetch";
import { useEffect, useState } from "react";

export default function () {
	const router = useRouter();
	const { apiResponse, apiRequestError } = useFetch(
		`/api/movie-details?id=${router.query.id}`
	);
	const [movieData, setMovieData] = useState({});

	useEffect(() => {
		if (apiRequestError !== null) {
			console.error(apiRequestError);
		}
	}, [apiRequestError]);

	useEffect(() => {
		if (apiResponse !== null) {
			async () => {
				const { overview, poster_path, release_date, runtime, title } =
					apiResponse.json();
				setMovieData({
					overview,
					poster_path,
					release_date,
					runtime,
					title,
				});
			};
		}
	}, [apiResponse]);

	return (
		<div>
			<p>Movie Title: {movieData.title}</p>
		</div>
	);
}
