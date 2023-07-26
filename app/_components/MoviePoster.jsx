"use client";

import Image from "next/image";

import { useTmdbApiConfig } from "@context/TmdbApiConfigContext";

export default function MovieFunction({ movieTitle, posterPath }) {
	const { images } = useTmdbApiConfig();

	return (
		<Image
			src={`${images.secure_base_url}${
				images.poster_sizes[images.poster_sizes.length - 1]
			}${posterPath}`}
			alt={`Theatrical poster for the movie ${movieTitle}`}
			width={780}
			height={780}
			priority
		/>
	);
}
