import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";

import createURL from "@utils/createURL";

export const dynamic = "force-dynamic";

/**
 * @param {NextRequest} request
 */
export async function GET(request) {
	const requestUrl = createURL(request.url);
	const code = requestUrl.searchParams.get("code");

	if (code) {
		const supabaseClient = createRouteHandlerClient({ cookies });
		await supabaseClient.auth.exchangeCodeForSession(code);
	}

	return NextResponse.redirect(`${requestUrl.origin}/dashboard`);
}
