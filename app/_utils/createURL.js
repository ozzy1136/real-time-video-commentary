/**
 *
 * @param {String} baseUrl
 * @param {String} pathname
 * @param {Array<[String: key, String: value]>} searchParams
 * @returns {URL}
 */
export default function createURL(baseUrl, pathname, searchParams) {
	const url = new URL(baseUrl);

	if (pathname) {
		url.pathname = `${url.pathname}${pathname}`;
	}

	if (searchParams) {
		for (const param of searchParams) {
			url.searchParams.append(param[0], param[1]);
		}
	}

	return url;
}
