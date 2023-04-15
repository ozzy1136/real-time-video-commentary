/** @type {import('next').NextConfig} */
module.exports = {
	reactStrictMode: true,
	webpack: (config) => {
		config.resolve.alias = {
			...config.resolve.alias,
		};

		return config;
	},
};
