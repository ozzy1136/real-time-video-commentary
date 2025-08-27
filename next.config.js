/** @type {import('next').NextConfig} */
module.exports = {
	reactStrictMode: true,
	allowedDevOrigins: [
		'*.loca.lt'
	],
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "image.tmdb.org",
				pathname: "/t/p/**",
			},
		],
	},
};
