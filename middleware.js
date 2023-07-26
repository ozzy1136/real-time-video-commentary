import { NextResponse } from "next/server";

import { supabaseMiddlewareClient } from "@lib/supabaseClient";

export async function middleware(req) {
	const res = NextResponse.next();
	const supabaseClient = supabaseMiddlewareClient(req, res);

	const {
		data: { session },
	} = await supabaseClient.auth.getSession();

	if (!session) {
		if (
			req.nextUrl.pathname.startsWith("/dashboard") ||
			req.nextUrl.pathname.startsWith("/movies/")
		) {
			return NextResponse.redirect(
				`${req.nextUrl.origin}/?redirectedFrom=${encodeURIComponent(
					req.nextUrl.pathname
				)}`
			);
		}
	}

	if (session) {
		if (req.nextUrl.pathname === "/") {
			return NextResponse.redirect(`${req.nextUrl.origin}/dashboard`);
		}
	}

	return res;
}
