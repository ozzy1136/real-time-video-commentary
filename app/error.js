"use client";

import { useEffect } from "react";

export default function Error({ error, reset }) {
	useEffect(() => {
		if (error instanceof SyntaxError) {
			// Unexpected token < in JSON
			console.log("There was a SyntaxError", error);
		} else {
			console.log("There was an error", error);
		}
	}, [error]);

	return (
		<div>
			<h2>Something went wrong!</h2>
			<button
				onClick={
					// Attempt to recover by trying to re-render the segment
					() => reset()
				}
			>
				Try again
			</button>
		</div>
	);
}
