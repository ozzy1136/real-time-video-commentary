import { NextRequest, NextResponse } from "next/server";
import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";

/**
 * @param {NextRequest} req
 */
export async function middleware(req) {
	const res = NextResponse.next();
	const supabaseClient = createMiddlewareClient({ req, res });

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
