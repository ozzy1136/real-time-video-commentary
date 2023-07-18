import { NextResponse } from "next/server";

import { supabaseMiddlewareClient } from "@lib/supabaseClient";

export async function middleware(req) {
	const res = NextResponse.next();
	const supabaseClient = supabaseMiddlewareClient(req, res);

	const {
		data: { session },
	} = await supabaseClient.auth.getSession();

	if (!session) {
		return NextResponse.redirect(
			`${req.nextUrl.origin}/?=redirectedFrom=${encodeURIComponent(
				req.nextUrl.pathname
			)}`
		);
	}

	return res;
}

export const config = {
	matcher: ["/dashboard", "/movies/(.*)"],
};
