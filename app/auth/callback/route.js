import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { supabaseRouteHandlerClient } from "@lib/supabaseClient";
import createURL from "@utils/createURL";

export async function GET(request) {
	const requestUrl = createURL(request.url);
	const code = requestUrl.searchParams.get("code");

	if (code) {
		const supabaseClient = supabaseRouteHandlerClient(cookies);
		await supabaseClient.auth.exchangeCodeForSession(code);
	}

	return NextResponse.redirect(`${request.origin}/dashboard`);
}
