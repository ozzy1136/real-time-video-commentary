import { useEffect, useReducer } from "react";

const initialState = {
	data: null,
	error: null,
};

function fetchReducer(state, action) {
	switch (action.type) {
		case "loading": {
			return {
				...initialState,
			};
		}
		case "error": {
			return {
				...initialState,
				error: action.payload,
			};
		}
		case "fetched": {
			return {
				...initialState,
				data: action.payload,
			};
		}
		default:
			return state;
	}
}

export default function useFetch({
	url,
	useLocalStorage = false,
	useCache = false,
	cacheName,
	cacheMaxAge,
}) {
	const [state, dispatch] = useReducer(fetchReducer, initialState);

	useEffect(() => {
		if (!window) return;

		if (!url) return;

		const controller = new AbortController();

		(async () => {
			dispatch({ type: "loading" });

			if (useLocalStorage) {
				if (localStorage.hasOwnProperty(url)) {
					dispatch({
						type: "fetched",
						payload: JSON.parse(localStorage.getItem(url)),
					});
					return;
				}
			} else if (useCache) {
				const cache = await caches.open(cacheName);
				const cachedResponse = await cache.match(url);
				if (cachedResponse !== undefined) {
					if (
						cacheMaxAge &&
						Date.now() -
							new Date(
								cachedResponse.headers.get("Date")
							).getTime() >
							cacheMaxAge
					) {
						cache.delete(url);
					} else {
						dispatch({
							type: "fetched",
							payload: cachedResponse,
						});
						return;
					}
				}
			}

			try {
				const response = await fetch(url, {
					signal: controller.signal,
				});
				if (!response.ok) {
					const data = await response.json();
					throw new Error(`${response.status} ${data.message}`);
				}
				if (useLocalStorage) {
					const data = await response.json();
					localStorage.setItem(url, JSON.stringify(data));
					dispatch({
						type: "fetched",
						payload: data,
					});
					return;
				} else if (useCache) {
					const cache = await caches.open(cacheName);
					cache.put(url, response.clone());
				}
				dispatch({
					type: "fetched",
					payload: response,
				});
			} catch (error) {
				dispatch({
					type: "error",
					payload: error,
				});
			}
		})();

		return () => {
			controller.abort();
		};
	}, [url, useLocalStorage, useCache]);

	return state;
}
