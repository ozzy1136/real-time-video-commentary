import { urlToHttpOptions } from "url";

import { serverGetRequest } from "@utils/httpsRequests";
import { TMDB_API_BASE_URL } from "@data/projectConstants";

const apiUrl = new URL(TMDB_API_BASE_URL);
const httpsRequestForMovieDetails = {
	method: "GET",
	headers: {
		Authorization: `Bearer ${process.env.TMDB_API_READ_ACCESS_TOKEN}`,
	},
};

export default async function (req, res) {
	const id = req.query.id;
	if (id.match(/^(?=(\d{1,10}))\1$/)) {
		apiUrl.pathname = `${apiUrl.pathname}/movie/${id}`;
		httpsRequestForMovieDetails = {
			...httpsRequestForMovieDetails,
			...urlToHttpOptions(apiUrl),
		};
		try {
			const data = await serverGetRequest(httpsRequestForMovieDetails);
			res.status(200).json(JSON.parse(data));
		} catch (error) {
			res.status(500).json({
				message: error.message,
			});
		}
	} else {
		res.status(400).json({ message: "The movie ID is invalid" });
	}
}
