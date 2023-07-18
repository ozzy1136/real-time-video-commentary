import {
	createClientComponentClient,
	createServerComponentClient,
	createRouteHandlerClient,
	createMiddlewareClient,
} from "@supabase/auth-helpers-nextjs";

export function supabaseClientComponentClient() {
	return createClientComponentClient();
}

export function supabaseServerComponentClient(cookies) {
	return createServerComponentClient({ cookies });
}

export function supabaseRouteHandlerClient(cookies) {
	return createRouteHandlerClient({ cookies });
}

export function supabaseMiddlewareClient(req, res) {
	return createMiddlewareClient({ req, res });
}
