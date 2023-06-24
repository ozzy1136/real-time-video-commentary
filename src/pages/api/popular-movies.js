import { urlToHttpOptions } from "url";

import { TMDB_API_BASE_URL } from "@data/projectConstants";
import { serverGetRequest } from "@utils/httpsRequests";

const popular_movies_url = new URL(TMDB_API_BASE_URL);
popular_movies_url.pathname = `${popular_movies_url.pathname}/discover/movie`;
popular_movies_url.searchParams.append("region", "US");
popular_movies_url.searchParams.append("release_date.gte", "2022-01-09");
popular_movies_url.searchParams.append("watch_region", "US");
popular_movies_url.searchParams.append("with_release_type", "4");
popular_movies_url.searchParams.append(
	"with_watch_monetization_types",
	"flatrate"
);

const httpsRequestForPopularMovies = {
	...urlToHttpOptions(popular_movies_url),
	method: "GET",
	headers: {
		Authorization: `Bearer ${process.env.TMDB_API_READ_ACCESS_TOKEN}`,
	},
};

// TODO lock down route and only allow users that are signed in to make request
export default async function (req, res) {
	switch (req.method) {
		case "GET":
			{
				try {
					const data = await serverGetRequest(
						httpsRequestForPopularMovies
					);
					res.status(200).json(JSON.parse(data));
				} catch (error) {
					res.status(500).json({
						message: error.message,
					});
				}
			}
			break;

		default:
			res.setHeader("Allow", ["GET"])
				.status(405)
				.json({ message: `Method ${req.method} not allowed` });
	}
}
