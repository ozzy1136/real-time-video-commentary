/**
 * @param {string} baseUrl
 * @param {string} [pathname]
 * @param {Array<[key: string, value: string]>} [searchParams]
 * @returns {URL}
 */
export default function createURL(baseUrl, pathname, searchParams) {
	const url = new URL(baseUrl);

	if (pathname) {
		url.pathname = `${url.pathname}${pathname}`;
	}

	if (searchParams?.length) {
		for (const param of searchParams) {
			url.searchParams.append(param[0], param[1]);
		}
	}

	return url;
}
