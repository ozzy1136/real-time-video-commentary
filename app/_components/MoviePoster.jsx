"use client";

import Image from "next/image";

export default function MovieFunction({ movieTitle, posterPath }) {
	return (
		<Image
			src={`${process.env.NEXT_PUBLIC_TMDB_POSTERS_BASE_URL}${posterPath}`}
			alt={`Theatrical poster for the movie ${movieTitle}`}
			width={780}
			height={780}
			priority
		/>
	);
}
