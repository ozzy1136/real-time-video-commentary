import https from "https";

export async function serverGetRequest(req) {
	return new Promise((resolve, reject) => {
		https
			.request(req, (res) => {
				if (res.statusCode !== 200) {
					reject(
						new Error(
							`HTTPS request returned non-OK status ${res.statusCode} ${res.statusMessage}`
						)
					);
				}

				let chunks = [];
				res.on("data", (data) => {
					chunks.push(data);
				});
				res.on("end", () => {
					resolve(Buffer.concat(chunks).toString());
				});
			})
			.on("error", (error) => {
				reject(error);
			})
			.end();
	});
}
